/**
 * Created by lyc on 17-6-11.
 */
import jQuery from 'jquery';

jQuery.ajaxSetup({
    error: function (error) {
        debugger;
        console.log("ajaxSetup error", error);
        // alert(error.responseJSON.message);
        if (error.status != 500) {
            // window.location.href = "../module/login.html";
        }
    }
});

export default { jQuery }

