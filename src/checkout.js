/**
 * Stripe Checkout Button & Modal
 * @author: @cameronjroe
 */
angular.module('angularPayments')
  
  .directive('stripeCheckout', ['$window', function ($window) {
    return {
      restrict: 'A',
      scope: {
        key: '@',
        img: '@',
        token: '&',
        name: '@',
        description: '@',
        amount: '@'
      },
      link: function (scope, el, attrs) {
        
        if(!$window.StripeCheckout){
          throw 'stripeCheckout requires that you have stripe.js installed. Please include this script tag: <script src="https://checkout.stripe.com/checkout.js"></script>';
        }

        var handler = $window.StripeCheckout.configure({
          key: scope.key,
          image: scope.img,
          token: function(token) {
            // Use the token to create the charge with a server-side script.
            // You can access the token ID with `token.id`
            console.log(token);
          }
        });

        el.bind('click', function (e) {
          // Open Checkout with further options
          handler.open({
            name: scope.name,
            description: scope.description,
            amount: scope.amount
          });
          e.preventDefault();
        });

        // Close Checkout on page navigation
        angular.element($window).bind('popstate', function() {
          handler.close();
        });

      }
    };
  }]);