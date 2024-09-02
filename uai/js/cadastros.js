jQuery(document).ready(function ($) {
    API_CEP = '/cep-ws.php';

    $('#usuario_cep').blur(function () {
        $.get(API_CEP + '?cep=' + this.value + '&formato=json', function (data) {
            if (data.resultado_txt.indexOf("completo") === -1) {
                $('#usuario_cep').addClass("error");
                $('#usuario_cep').on("keyup", function (e) {
                    $('#usuario_cep').removeClass("error");
                    $('#usuario_cep').off("keyup");
                })
                return false;
            }

            if (data.logradouro) {
                $('#usuario_logradouro').val(data.logradouro);
            }
            if (data.bairro) {
                $('#usuario_bairro').val(data.bairro);
            }
            if (data.cidade) {
                $('#usuario_cidade').val(data.cidade);
            }
            if (data.uf) {
                $('#usuario_estado').val(data.uf);
            }

            $('#usuario_pais').val('Brasil');
        }, 'json');
    });

    $('#usuario_campanha_motivo_outro').click(function () {
        if ($(this).is(':checked')) {
            $('#usuario_campanha_motivo_outro_value').closest('.form-row').show();
        } else {
            $('#usuario_campanha_motivo_outro_value').closest('.form-row').hide();
        }
    });

    setTimeout(function () {
        $('#usuario_campanha_motivo_outro').triggerHandler('click');
    }, 2000);

    $('.mask-cartao').mask('0000-0000-0000-0000', { reverse: true });
    $('.mask-cep').mask('00000-000', { reverse: true });
    $('.mask-cpf').mask('000.000.000-00', { reverse: true });
    $('.mask-cnpj').mask('00.000.000/0000-00', { reverse: true });
    $('.mask-money').mask('0.000,00', { reverse: true });

    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
        spOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };

    $('.mask-phone').mask(SPMaskBehavior, spOptions);
});