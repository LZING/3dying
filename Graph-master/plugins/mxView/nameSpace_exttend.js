/**
 * Created by leiting on 14/8/26.
 */
(function (arg) {

    var self = arg;

    self.nameSpace = {

        reg: function(s){
            var arr = s.split('.');
            var namespace = self;

            for (var i = 0, k = arr.length; i < k; i++) {
                if (typeof namespace[arr[i]] == 'undefined') {
                    namespace[arr[i]] = {};
                }

                namespace = namespace[arr[i]];
            }

            return namespace;
        },

        del: function(s){
            var arr = s.split('.');
            var namespace = self;

            for (var i = 0, k = arr.length; i < k; i++) {
                if (typeof namespace[arr[i]] == 'undefined') {
                    return;
                }else if (k == i + 1) {
                    delete namespace[arr[i]];
                    return;
                }else{
                    namespace = namespace[arr[i]];
                }
            }
        },

        isDefined: function(s){
            var arr = s.split('.');
            var namespace = self;

            for (var i = 0, k = arr.length; i < k; i++) {
                if (typeof namespace[arr[i]] == 'undefined') {
                    return false;
                }

                namespace = namespace[arr[i]];
            }

            return true;
        }
    };
})(window);