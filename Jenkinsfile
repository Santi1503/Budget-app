pipeline {
    agent any
    environment {
        SERVER_REG = "balgittuber"

        /** DEPLOYMENT **/
        APP_NAME = "budget-app"
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

                    export KUBECONFIG=/var/jenkins_home/.kube/kubeconfig-fresh.yaml
                    kubectl set image deployment/${APP_NAME} ${APP_NAME}=${SERVER_REG}/${APP_NAME}:${BRANCH_NAME}-${BUILD_ID}
                    """
            }
        }
    }
}