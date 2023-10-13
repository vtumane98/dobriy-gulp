$(document).on('submit', '[data-action="form-rest"]', function (e) {
    e.preventDefault();

    let $form = $(this);

    $.ajax({
        type: 'POST',
        url: $form.attr('action'),
        dataType: "json",
        data: $form.serialize()
    }).done(function (data) {
        if (data === true) {
            $form.html('Спасибо! Ваша заявка принята.');
            return;
        }

        if (data?.errors_fields && data.errors_fields.length) {
            data.errors_fields.forEach(function (item) {
                let $error = $form
                    .find('[data-error="' + item.name + '"]')
                    .html(item.error)
                    .show();

                $form
                    .find('[name="' + item.name + '"]')
                    .addClass('error')
                    .on('change focus', function (e) {
                        console.log(1);
                        $error.hide(200);
                        $(this).removeClass('error');
                        $(this).unbind(e.type);
                    });
            });
        }
    }).fail(function (jqXHR, textStatus) {
        alert("Непредвиденная ошибка :( Статус - " + textStatus);
    })
})