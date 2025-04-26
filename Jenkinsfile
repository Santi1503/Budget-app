pipeline {
    agent any
    environment {
        SERVER_REG = "balgittuber"
        AWS_SERVER = "ubuntu@34.235.175.49"
        AWS_PEM = "/var/jenkins_home/aws/santi.pem"

        /** DEPLOYMENT **/
        APP_NAME = "budet-app"
        PORT = "3001"
        SCANNER_HOME = tool 'sonarqube'
    }

    stages {
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh "${SCANNER_HOME}/bin/sonar-scanner"
                }
            }
        }
        stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                echo '====== DEPLOYING ======'
                sh """
                    docker build . -f Dockerfile -t ${SERVER_REG}/${APP_NAME}:${BRANCH_NAME}-${BUILD_ID}
                    docker login 
                    docker push ${SERVER_REG}/${APP_NAME}:${BRANCH_NAME}-${BUILD_ID}

                    ssh -i ${AWS_PEM} ${AWS_SERVER} \"
                    if docker ps -a --format '{{.Names}}' | grep -Eq '^${APP_NAME}\$'; then
                        echo 'Stopping and removing existing container: ${APP_NAME}'
                        docker stop ${APP_NAME}
                        docker rm ${APP_NAME}
                    fi
                    \"

                    ssh -i ${AWS_PEM} ${AWS_SERVER} \"
                    # Run the new container
                    docker run -d --name ${APP_NAME} --restart always -p ${PORT}:5173 ${SERVER_REG}/${APP_NAME}:${BRANCH_NAME}-${BUILD_ID}
                    \"
                    """
            }
        }
    }
}