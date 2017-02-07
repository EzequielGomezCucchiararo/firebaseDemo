angular.module('skyLabControllers')
  .controller('AuthController', function ($scope, $firebaseAuth, $firebaseObject, $firebaseArray) {
    $scope.auth = $firebaseAuth()
    $scope.user = null
    $scope.auth.$onAuthStateChanged(function (googleUser) {
      if (googleUser) {
        $scope.user = {
          name: googleUser.displayName,
          photo: googleUser.photoURL,
          id: googleUser.uid
        }
      } else {
        $scope.user = null
      }
    })

    $scope.login = function () {
      $scope.auth.$signInWithPopup('google')
      .then(function (d) {

      })
      .catch(function (error) {

      })
    }

    $scope.logout = function () {
      $scope.auth.$signOut()
    }

          // Acces to the DDBB of the project
    var ref = firebase.database().ref()
      // Create a node in the DDBB called "messages"
    var messagesRef = ref.child('messages')
      // Here we'll save the messages from the DDBB
    $scope.messagesList = []

    $scope.sendMessage = function ($event, message, user) {
      $event.preventDefault()
      $scope.messagesList.$add({
        message: message,
        user: user
      })
      $scope.lastMessage = ''
    }

    $scope.loadMessages = function () {
      $scope.messagesList = $firebaseArray(messagesRef)
      console.log($scope.messagesList)
    }
  })
