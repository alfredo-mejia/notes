
if (typeof jQuery !== "undefined") {
    $(function() {
        // Quanity in header 
        let quantitySpan = $(".quantity");

        // Form elements
        let form = $("form");
        let input = form.find("input");

        // List items
        let list = $("ul");
        let listItems = list.find("li");

        // Button
        let newItemBttn = $('button[type="button"]');

        form.hide()
        listItems.remove();
        quantitySpan.text(list.find(".active").length);

        newItemBttn.on("click", () => {
            newItemBttn.hide();
            form.show();
        });

        form.on("submit", (event) => {
            event.preventDefault();
            let newItem = $("<li>" + input.val() + "</li>").hide();
            newItem.addClass("active");
            list.prepend(newItem);
            newItem.slideDown(500);
            input.val("");
            form.hide();
            newItemBttn.show();
            quantitySpan.text(list.find(".active").length);
        });

        list.on("click", (event) => {
            let target = $(event.target)

            if (target.hasClass("active")) {
                target.fadeOut(500, () => {
                    target.detach();
                    list.append(target)
                    target.removeClass("active");
                    target.addClass("complete");
                    target.fadeIn(500);
                    quantitySpan.text(list.find(".active").length);
                });
            }

            else if (target.hasClass("complete")) {
                target.fadeOut(500, () => {
                    target.remove();
                });
            }
            
        });

    });
}

else {
    document.addEventListener("DOMContentLoaded", () => {
        let msg = document.createElement("h2");
        msg.textContent = "!!! jQuery Failed to Load !!! This site will not work !!!";
        
        let body = document.querySelector("body");
        body.append(msg);
    });
}