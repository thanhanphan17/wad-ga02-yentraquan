pipeline {
    agent any

    parameters {
        choice(
            name: 'ACTION',
            choices: ['Package and Push Image', 'Deploy Application', 'Remove all'],
        )
    }

    stages {
        stage('Packaging/Pushing Image') {
            when {
                branch 'master'
            }
            steps {
                withDockerRegistry(
                    credentialsId: 'dockerhub',
                    url: 'https://index.docker.io/v1/'
                ) {
                    sh 'docker build -t thanhanphan17/passport-demo .'
                    sh 'docker push thanhanphan17/passport-demo'
                }
            }
        }

        stage('Deploying application') {
            when {
                branch 'master'
            }
            steps {
                withDockerRegistry(
                    credentialsId: 'dockerhub',
                    url: 'https://index.docker.io/v1/'
                ) {
                    sh 'docker rm -f passport-demo || echo "No container to remove"'
                    sh 'docker rmi -f passport-demo || echo "No image to remove"'
                    sh '''
                        docker container run \
                            --restart unless-stopped \
                            --env RUNTIME_ENV=prod \
                            --name passport-demo \
                            --network tealicious_network \
                            -dp 8888:8888 \
                            thanhanphan17/passport-demo
                    '''
                }
            }
        }

        stage('Removing all container and image') {
            when {
                environment name: 'ACTION', value: 'Remove all'
            }
            steps {
                sh 'docker rm -f postgres-db'
                sh 'docker rm -f passport-demo'
                sh 'docker rmi -f thanhanphan17/passport-demo'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}