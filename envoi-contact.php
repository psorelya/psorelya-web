<?php
header('Content-Type: application/json');

// On accepte uniquement les requêtes POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "erreur" => "Méthode non autorisée"]);
    exit;
}

// Récupération et nettoyage des champs
$nom      = isset($_POST["nom"])      ? trim(strip_tags($_POST["nom"]))      : "";
$courriel = isset($_POST["courriel"]) ? trim($_POST["courriel"])             : "";
$sujet    = isset($_POST["sujet"])    ? trim(strip_tags($_POST["sujet"]))    : "Non précisé";
$message  = isset($_POST["message"])  ? trim($_POST["message"])              : "";

// Validation de base
if ($nom === "" || $message === "" || !filter_var($courriel, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["ok" => false, "erreur" => "Champs manquants ou courriel invalide"]);
    exit;
}

// Construction du courriel
$destinataire = "info@psorelya.com";
$objet        = "Nouveau message du site Psorelya — " . $sujet;

$corps  = "Vous avez reçu un nouveau message via le formulaire de contact.\n\n";
$corps .= "Nom      : " . $nom . "\n";
$corps .= "Courriel : " . $courriel . "\n";
$corps .= "Sujet    : " . $sujet . "\n";
$corps .= "------------------------------------------\n\n";
$corps .= $message . "\n";

// En-têtes : l'expéditeur est le domaine (pour la délivrabilité),
// le Reply-To est le visiteur (pour répondre directement)
$headers  = "From: Psorelya <info@psorelya.com>\r\n";
$headers .= "Reply-To: " . $courriel . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Envoi — le 5e paramètre (-f) fixe l'expéditeur d'enveloppe,
// ce qui améliore la délivrabilité et l'alignement SPF sur cPanel
if (mail($destinataire, $objet, $corps, $headers, "-f info@psorelya.com")) {
    echo json_encode(["ok" => true]);
} else {
    http_response_code(500);
    echo json_encode(["ok" => false, "erreur" => "Échec de l'envoi"]);
}
?>
