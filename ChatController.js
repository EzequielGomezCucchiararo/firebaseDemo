  angular.module('skyLabControllers')
	  .controller('ChatController', function ($scope, $firebaseObject, $firebaseArray) {
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

// 160gb cada dos dias de chats (200k € al mes)
