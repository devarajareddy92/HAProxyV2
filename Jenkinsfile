pipeline {
    agent any

    tools {
        nodejs 'Nodejs' // Use the NodeJS installation configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the source code from the repository
                git 'https://github.com/devarajareddy92/HAProxyV2.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                // Use NodeJS wrapper to ensure the environment is set up correctly
                withEnv(['PATH+NODEJS=${tool name: "Nodejs"}/bin']) {
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                withEnv(['PATH+NODEJS=${tool name: "Nodejs"}/bin']) {
                    // Build the React application
                    sh 'CI= npm run build'
                }
            }
        }
       
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t myapp:latest .'
                }
            }
        }
        stage('Deploy Docker Container') {
            steps {
                script {
                    // Stop and remove the existing container if it exists
                    sh '''
                    docker stop myapp || true
                    docker rm myapp || true
                    '''
                    // Run the Docker container
                    sh 'docker run -d -p 80:80 --name myapp myapp:latest'
                }
            }
        }
    }

    post {
        success {
            // Actions to perform on successful build
            echo 'Build and deployment completed successfully!'
        }
        failure {
            // Actions to perform on failed build
            echo 'Build or deployment failed!'
        }
    }
}
