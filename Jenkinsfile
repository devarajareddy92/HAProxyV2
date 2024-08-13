pipeline {
    agent any

    tools {
        nodejs 'Nodejs' // Use the NodeJS installation configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/devarajareddy92/HAProxyV2.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                withEnv(['PATH+NODEJS=${tool name: "Nodejs"}/bin']) {
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                withEnv(['PATH+NODEJS=${tool name: "Nodejs"}/bin']) {
                    sh 'CI= npm run build'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'sudo docker build -t myapp:latest .'
            }
        }
        stage('Run Docker Container') {
            steps {
                sh 'sudo docker run -d -p 8081:80 myapp:latest' // Maps container's port 80 to host's port 8081
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
