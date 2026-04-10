// // =============================================================
// // Jenkinsfile — Declarative CI Pipeline for Tetris DevOps
// // =============================================================
// // This file defines the entire CI pipeline as code.
// // WHY: Pipeline as code means your build process is versioned,
// // reviewed, and reproducible — just like your application code.
// //
// // Declarative syntax: structured, readable, validated by Jenkins
// // =============================================================

// pipeline {

//     // ── Where to run ────────────────────────────────────────
//     // 'any' = run on any available Jenkins agent (worker)
//     // In our setup, that's the Jenkins container itself
//     agent any

//     // ── Environment variables ────────────────────────────────
//     // Available to ALL stages
//     // credentialsId references the ID we set in Step 4.8
//     environment {
//         APP_NAME        = 'tetris-devops'
//         APP_VERSION     = '1.0.0'
//         DOCKER_IMAGE    = "${DOCKERHUB_USERNAME}/${APP_NAME}"
//         GIT_HASH        = sh(script: 'git rev-parse --short HEAD',
//                              returnStdout: true).trim()
//         NODE_VERSION    = '20'

//         // This loads DOCKERHUB_USERNAME and DOCKERHUB_TOKEN
//         // from the Jenkins credential store — never exposed in logs
//         DOCKERHUB_USERNAME = credentials('dockerhub-credentials').username
//     }

//     // ── Build options ────────────────────────────────────────
//     options {
//         // Keep only last 10 builds (saves disk space)
//         buildDiscarder(logRotator(numToKeepStr: '10'))

//         // Fail the build if it takes longer than 30 minutes
//         timeout(time: 30, unit: 'MINUTES')

//         // Don't run the same pipeline twice at the same time
//         disableConcurrentBuilds()

//         // Add timestamps to all log lines
//         timestamps()
//     }

//     // ── Triggers ─────────────────────────────────────────────
//     triggers {
//         // Poll GitHub every 5 minutes for new commits
//         // H/5 = every 5 minutes (H adds jitter to avoid overload)
//         // In production you'd use a webhook instead
//         pollSCM('H/5 * * * *')
//     }

//     // ── Pipeline stages ──────────────────────────────────────
//     stages {

//         // ─────────────────────────────────────────────────────
//         // STAGE 1: Checkout
//         // Pull the latest code from GitHub
//         // ─────────────────────────────────────────────────────
//         stage('Checkout') {
//             steps {
//                 echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
//                 echo '  STAGE 1: Checking out source code'
//                 echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

//                 // 'checkout scm' pulls from the repo configured
//                 // in the Jenkins job — no hardcoded URL needed
//                 checkout scm

//                 // Show what we checked out
//                 sh 'echo "Branch: $(git branch --show-current)"'
//                 sh 'echo "Commit: $(git rev-parse --short HEAD)"'
//                 sh 'echo "Author: $(git log -1 --format=%an)"'
//                 sh 'echo "Message: $(git log -1 --format=%s)"'
//             }
//         }

//         // ─────────────────────────────────────────────────────
//         // STAGE 2: Install Dependencies
//         // ─────────────────────────────────────────────────────
//         stage('Install Dependencies') {
//             steps {
//                 echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
//                 echo '  STAGE 2: Installing dependencies'
//                 echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

//                 dir('app') {
//                     // Use 'ci' not 'install' in CI pipelines
//                     // WHY: npm ci is faster, stricter, and uses
//                     // exact versions from package-lock.json
//                     sh 'npm ci'
//                     sh 'echo "Dependencies installed successfully"'
//                     sh 'npm list --depth=0 2>/dev/null | head -20'
//                 }
//             }
//         }

//         // ─────────────────────────────────────────────────────
//         // STAGE 3: Run Tests
//         // If tests fail, pipeline stops here — image never built
//         // This is the most important quality gate
//         // ─────────────────────────────────────────────────────
//         stage('Run Tests') {
//             steps {
//                 echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
//                 echo '  STAGE 3: Running unit tests'
//                 echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

//                 dir('app') {
//                     sh '''
//                         npx jest \
//                           --watchAll=false \
//                           --no-coverage \
//                           --verbose \
//                           --forceExit
//                     '''
//                 }
//             }

//             // Post-stage action — runs after tests complete
//             post {
//                 success {
//                     echo '✅ All tests passed!'
//                 }
//                 failure {
//                     echo '❌ Tests failed — stopping pipeline'
//                     echo 'Fix the failing tests before merging'
//                 }
//             }
//         }

//         // ─────────────────────────────────────────────────────
//         // STAGE 4: Code Coverage
//         // Generate coverage report and archive it
//         // ─────────────────────────────────────────────────────
//         stage('Code Coverage') {
//             steps {
//                 echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
//                 echo '  STAGE 4: Checking code coverage'
//                 echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

//                 dir('app') {
//                     sh '''
//                         npx jest \
//                           --watchAll=false \
//                           --coverage \
//                           --forceExit \
//                           --coverageReporters=text \
//                           --coverageReporters=lcov
//                     '''
//                 }
//             }

//             post {
//                 always {
//                     // Archive coverage report as Jenkins artifact
//                     // Visible in Jenkins UI after build
//                     archiveArtifacts(
//                         artifacts: 'app/coverage/**/*',
//                         allowEmptyArchive: true
//                     )
//                 }
//             }
//         }

//         // ─────────────────────────────────────────────────────
//         // STAGE 5: Build Docker Image
//         // ─────────────────────────────────────────────────────
//         stage('Build Docker Image') {
//             steps {
//                 echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
//                 echo '  STAGE 5: Building Docker image'
//                 echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

//                 script {
//                     // Load Docker Hub credentials from Jenkins store
//                     withCredentials([
//                         usernamePassword(
//                             credentialsId: 'dockerhub-credentials',
//                             usernameVariable: 'DHUB_USER',
//                             passwordVariable: 'DHUB_TOKEN'
//                         )
//                     ]) {
//                         // Build the image
//                         sh """
//                             docker build \
//                               -f docker/Dockerfile \
//                               -t ${APP_NAME}:latest \
//                               -t ${APP_NAME}:${APP_VERSION} \
//                               -t ${APP_NAME}:${APP_VERSION}-${GIT_HASH} \
//                               --no-cache \
//                               .
//                         """

//                         // Also tag with Docker Hub username
//                         sh """
//                             docker tag ${APP_NAME}:latest \
//                               ${DHUB_USER}/${APP_NAME}:latest
//                             docker tag ${APP_NAME}:latest \
//                               ${DHUB_USER}/${APP_NAME}:${APP_VERSION}
//                             docker tag ${APP_NAME}:latest \
//                               ${DHUB_USER}/${APP_NAME}:${APP_VERSION}-${GIT_HASH}
//                         """

//                         // Show image size
//                         sh "docker images | grep ${APP_NAME}"
//                     }
//                 }
//             }
//         }

//         // ─────────────────────────────────────────────────────
//         // STAGE 6: Push to Docker Hub
//         // ─────────────────────────────────────────────────────
//         stage('Push to Docker Hub') {
//             // Only push on main/master branch
//             // WHY: Don't push feature branch images to registry
//             when {
//                 anyOf {
//                     branch 'main'
//                     branch 'master'
//                 }
//             }

//             steps {
//                 echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
//                 echo '  STAGE 6: Pushing to Docker Hub'
//                 echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

//                 script {
//                     withCredentials([
//                         usernamePassword(
//                             credentialsId: 'dockerhub-credentials',
//                             usernameVariable: 'DHUB_USER',
//                             passwordVariable: 'DHUB_TOKEN'
//                         )
//                     ]) {
//                         // Login to Docker Hub
//                         sh '''
//                             echo "$DHUB_TOKEN" | \
//                             docker login \
//                               --username "$DHUB_USER" \
//                               --password-stdin
//                         '''

//                         // Push all tags
//                         sh """
//                             docker push ${DHUB_USER}/${APP_NAME}:latest
//                             docker push ${DHUB_USER}/${APP_NAME}:${APP_VERSION}
//                             docker push \
//                               ${DHUB_USER}/${APP_NAME}:${APP_VERSION}-${GIT_HASH}
//                         """

//                         echo "✅ Pushed ${DHUB_USER}/${APP_NAME}:${APP_VERSION}-${GIT_HASH}"
//                     }
//                 }
//             }
//         }

//         // ─────────────────────────────────────────────────────
//         // STAGE 7: Verify Deployment
//         // Pull image and run a quick smoke test
//         // ─────────────────────────────────────────────────────
//         stage('Smoke Test') {
//             steps {
//                 echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
//                 echo '  STAGE 7: Running smoke test'
//                 echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

//                 script {
//                     // Run container from the built image
//                     sh """
//                         docker run -d \
//                           --name smoke-test-${BUILD_NUMBER} \
//                           -p 3002:3001 \
//                           ${APP_NAME}:latest
//                     """

//                     // Wait for it to start
//                     sh 'sleep 5'

//                     // Test health endpoint
//                     sh '''
//                         RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
//                           http://localhost:3002/health)
//                         if [ "$RESPONSE" != "200" ]; then
//                           echo "❌ Smoke test FAILED — health check returned $RESPONSE"
//                           exit 1
//                         fi
//                         echo "✅ Smoke test PASSED — health check returned 200"
//                     '''
//                 }
//             }

//             post {
//                 always {
//                     // Always clean up the test container
//                     sh """
//                         docker stop smoke-test-${BUILD_NUMBER} || true
//                         docker rm smoke-test-${BUILD_NUMBER} || true
//                     """
//                 }
//             }
//         }

//     } // end stages

//     // ── Post-pipeline actions ─────────────────────────────────
//     // These run after ALL stages complete
//     post {

//         success {
//             echo '''
//             ╔═══════════════════════════════════════╗
//             ║   ✅  PIPELINE SUCCEEDED               ║
//             ╚═══════════════════════════════════════╝
//             '''
//         }

//         failure {
//             echo '''
//             ╔═══════════════════════════════════════╗
//             ║   ❌  PIPELINE FAILED                  ║
//             ╚═══════════════════════════════════════╝
//             '''
//         }

//         always {
//             echo 'Cleaning up Docker images from build agent...'
//             sh """
//                 docker rmi ${APP_NAME}:latest || true
//                 docker rmi ${APP_NAME}:${APP_VERSION} || true
//                 docker image prune -f || true
//             """
//         }

//     } // end post

// } // end pipeline

pipeline {

    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        timestamps()
    }

    environment {
        APP_NAME    = 'tetris-devops'
        APP_VERSION = '1.0.0'
    }

    stages {

        // ─────────────────────────────────────────────────────
        // STAGE 1: Checkout
        // ─────────────────────────────────────────────────────
        stage('Checkout') {
            steps {
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
                echo 'STAGE 1: Checkout'
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

                // Use github-token (Secret text) for checkout
                withCredentials([
                    string(
                        credentialsId: 'github-token',
                        variable: 'GITHUB_TOKEN'
                    )
                ]) {
                    // Checkout using token authentication
                    git(
                        url: "https://github.com/KrishGitVerse/tetris-devops.git",
                        branch: 'main',
                        credentialsId: 'github-token'
                    )
                }

                sh '''
                    echo "Branch  : $(git branch --show-current)"
                    echo "Commit  : $(git rev-parse --short HEAD)"
                    echo "Message : $(git log -1 --format=%s)"
                '''
            }
        }

        // ─────────────────────────────────────────────────────
        // STAGE 2: Install Dependencies
        // ─────────────────────────────────────────────────────
        stage('Install Dependencies') {
            steps {
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
                echo 'STAGE 2: Install Dependencies'
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

                dir('app') {
                    sh 'node --version'
                    sh 'npm --version'
                    sh 'npm ci'
                    sh 'echo "Dependencies installed"'
                }
            }
        }

        // ─────────────────────────────────────────────────────
        // STAGE 3: Run Tests
        // ─────────────────────────────────────────────────────
        stage('Run Tests') {
            steps {
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
                echo 'STAGE 3: Run Tests'
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

                dir('app') {
                    sh '''
                        npx jest \
                          --watchAll=false \
                          --no-coverage \
                          --verbose \
                          --forceExit
                    '''
                }
            }

            post {
                success { echo '✅ All tests passed' }
                failure { echo '❌ Tests failed — pipeline stopped' }
            }
        }

        // ─────────────────────────────────────────────────────
        // STAGE 4: Code Coverage
        // ─────────────────────────────────────────────────────
        stage('Code Coverage') {
            steps {
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
                echo 'STAGE 4: Code Coverage'
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

                dir('app') {
                    sh '''
                        npx jest \
                          --watchAll=false \
                          --coverage \
                          --forceExit \
                          --coverageReporters=text \
                          --coverageReporters=lcov
                    '''
                }
            }

            post {
                always {
                    archiveArtifacts(
                        artifacts: 'app/coverage/**/*',
                        allowEmptyArchive: true
                    )
                }
            }
        }

        // ─────────────────────────────────────────────────────
        // STAGE 5: SonarQube Analysis
        // WHY: Scan code for bugs, vulnerabilities, code smells
        // Pipeline FAILS if quality gate is not passed
        // ─────────────────────────────────────────────────────
        stage('SonarQube Analysis') {
            steps {
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
                echo 'STAGE 5: SonarQube Analysis'
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

                script {
                    withCredentials([
                        usernamePassword(
                            credentialsId: 'sonar-token',
                            usernameVariable: 'SONAR_USER',
                            passwordVariable: 'SONAR_PASS'
                        )
                    ]) {
                        sh '''
                            sonar-scanner \
                            -Dsonar.projectKey=tetris-devops \
                            -Dsonar.projectName="Tetris DevOps" \
                            -Dsonar.projectVersion=1.0.0 \
                            -Dsonar.sources=app/src \
                            -Dsonar.tests=app/src/__tests__ \
                            -Dsonar.javascript.lcov.reportPaths=app/coverage/lcov.info \
                            -Dsonar.exclusions=**/node_modules/**,**/build/**,**/coverage/**,**/__mocks__/** \
                            -Dsonar.test.exclusions=**/node_modules/**,**/build/** \
                            -Dsonar.coverage.exclusions=**/node_modules/**,**/build/**,**/__tests__/**,**/index.jsx \
                            -Dsonar.host.url=http://host.docker.internal:9000 \
                            -Dsonar.login=${SONAR_USER} \
                            -Dsonar.password=${SONAR_PASS} \
                            -Dsonar.qualitygate.wait=true \
                            -Dsonar.sourceEncoding=UTF-8
                        '''
                    }
                }
            }

            post {
                success { echo '✅ SonarQube quality gate PASSED' }
                failure {
                    echo '❌ SonarQube quality gate FAILED'
                    echo 'Check http://localhost:9000 for details'
                }
            }
        }

        // ─────────────────────────────────────────────────────
        // STAGE 6: Build Docker Image
        // ─────────────────────────────────────────────────────
        stage('Build Docker Image') {
            steps {
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
                echo 'STAGE 6: Build Docker Image'
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

                script {
                    // Get git hash inside script block
                    def gitHash = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()

                    env.GIT_HASH = gitHash

                    echo "Building image: ${env.APP_NAME}:${env.APP_VERSION}-${gitHash}"

                    sh """
                        docker build \
                          -f docker/Dockerfile \
                          -t ${env.APP_NAME}:latest \
                          -t ${env.APP_NAME}:${env.APP_VERSION} \
                          -t ${env.APP_NAME}:${env.APP_VERSION}-${gitHash} \
                          .
                    """

                    sh "docker images | grep ${env.APP_NAME}"
                }
            }
        }

        // ─────────────────────────────────────────────────────
        // STAGE 7: Push to Docker Hub
        // ─────────────────────────────────────────────────────
        stage('Push to Docker Hub') {
            steps {
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
                echo 'STAGE 7: Push to Docker Hub'
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

                script {
                    withCredentials([
                        usernamePassword(
                            credentialsId: 'dockerhub-credentials',
                            usernameVariable: 'DHUB_USER',
                            passwordVariable: 'DHUB_TOKEN'
                        )
                    ]) {
                        // Login
                        sh '''
                            echo "$DHUB_TOKEN" | \
                            docker login \
                              --username "$DHUB_USER" \
                              --password-stdin
                        '''

                        // Tag with Docker Hub username
                        sh """
                            docker tag ${env.APP_NAME}:latest \
                              \$DHUB_USER/${env.APP_NAME}:latest

                            docker tag ${env.APP_NAME}:latest \
                              \$DHUB_USER/${env.APP_NAME}:${env.APP_VERSION}

                            docker tag ${env.APP_NAME}:latest \
                              \$DHUB_USER/${env.APP_NAME}:${env.APP_VERSION}-${env.GIT_HASH}
                        """

                        // Push all tags
                        sh """
                            docker push \$DHUB_USER/${env.APP_NAME}:latest
                            docker push \$DHUB_USER/${env.APP_NAME}:${env.APP_VERSION}
                            docker push \
                              \$DHUB_USER/${env.APP_NAME}:${env.APP_VERSION}-${env.GIT_HASH}
                        """

                        echo "✅ Successfully pushed to Docker Hub"
                    }
                }
            }
        }

        // // ─────────────────────────────────────────────────────
        // // STAGE 7: Smoke Test
        // // ─────────────────────────────────────────────────────
        // stage('Smoke Test') {
        //     steps {
        //         echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        //         echo 'STAGE 7: Smoke Test'
        //         echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

        //         script {
        //             def containerName = "smoke-${env.BUILD_NUMBER}"

        //             // Start container on a different port
        //             sh """
        //                 docker run -d \
        //                   --name ${containerName} \
        //                   -p 3099:3001 \
        //                   ${env.APP_NAME}:latest
        //             """

        //             // Wait for startup
        //             sh 'sleep 8'

        //             // Hit health endpoint
        //             sh """
        //                 HTTP_CODE=\$(curl -s -o /dev/null -w "%{http_code}" \
        //                   http://localhost:3099/health)

        //                 echo "Health check response: \$HTTP_CODE"

        //                 if [ "\$HTTP_CODE" != "200" ]; then
        //                   echo "❌ Smoke test FAILED"
        //                   exit 1
        //                 fi

        //                 echo "✅ Smoke test PASSED"
        //             """
        //         }
        //     }

        //     post {
        //         always {
        //             script {
        //                 def containerName = "smoke-${env.BUILD_NUMBER}"
        //                 sh "docker stop ${containerName} || true"
        //                 sh "docker rm   ${containerName} || true"
        //             }
        //         }
        //     }
        // }
        // ─────────────────────────────────────────────────────
        // STAGE 8: Smoke Test
        // ─────────────────────────────────────────────────────
        stage('Smoke Test') {
            steps {
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
                echo 'STAGE 8: Smoke Test'
                echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'

                script {
                    def containerName = "smoke-${env.BUILD_NUMBER}"
                    def networkName   = "smoke-net-${env.BUILD_NUMBER}"

                    try {
                        // Create an isolated network for this test
                        sh "docker network create ${networkName}"

                        // Start the app container on that network
                        sh """
                            docker run -d \
                            --name ${containerName} \
                            --network ${networkName} \
                            ${env.APP_NAME}:latest
                        """

                        // Wait for app to start
                        sh 'sleep 10'

                        // Run curl FROM INSIDE a container on the same network
                        // This avoids the localhost-between-containers problem
                        sh """
                            docker run --rm \
                            --network ${networkName} \
                            curlimages/curl:latest \
                            curl -s -o /dev/null -w "%{http_code}" \
                            http://${containerName}:3001/health \
                            | grep -q "200" && \
                            echo "✅ Smoke test PASSED" || \
                            (echo "❌ Smoke test FAILED" && exit 1)
                        """

                    } finally {
                        // Always clean up — even if test fails
                        sh "docker stop  ${containerName} || true"
                        sh "docker rm    ${containerName} || true"
                        sh "docker network rm ${networkName} || true"
                    }
                }
            }
        }

    } // end stages

    // ── Post pipeline ─────────────────────────────────────────
    post {
        success {
            echo '''
            ╔══════════════════════════════════╗
            ║   ✅  PIPELINE SUCCEEDED          ║
            ╚══════════════════════════════════╝
            '''
        }

        failure {
            echo '''
            ╔══════════════════════════════════╗
            ║   ❌  PIPELINE FAILED             ║
            ╚══════════════════════════════════╝
            '''
        }

        always {
            script {
                sh "docker rmi ${env.APP_NAME}:latest          || true"
                sh "docker rmi ${env.APP_NAME}:${env.APP_VERSION} || true"
                sh "docker image prune -f                      || true"
            }
        }
    }

} // end pipeline