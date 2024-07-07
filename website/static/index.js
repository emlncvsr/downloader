function copyToClipboard(url) {
    navigator.clipboard.writeText(url);
}

function openInNewTab(url) {
    window.open(url, '_blank').focus();
}

$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault(); // Empêche la soumission par défaut du formulaire

        var urlInput = $("#url").val();
        if (urlInput) {
            // Affiche la barre de progression si l'URL est remplie
            console.log("test");
            $(".progress").removeClass("d-none").addClass("progress-moved");

            // Soumettre le formulaire après la validation
            this.submit();
        }
    });
});
