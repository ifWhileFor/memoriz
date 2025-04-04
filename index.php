<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jeu de Mémoire - Page de Démarrage</title>
  <link rel="stylesheet" href="test.css">
</head>
<body>
  <div class="container">
    <h1>Bienvenue dans Mémo'Riz</h1>
    <button onclick="startGame()" class="start-button">Démarrer</button>

    
    <div class="buttons">
        
      <p>Connecter vous et choisissez un niveau pour commencer :</p>
      <a href="#" onclick="setLevel(1)" class="btn" id="facile" >Niveau Facile</a>
      <a href="#" onclick="setLevel(2)" class="btn">Niveau Moyen</a>
      <a href="#" onclick="setLevel(3)" class="btn">Niveau Difficile</a>
      <a href="ranking.php" class="btn">Classement</a>
</div></div>
    <div id="main">
      
  
  <div class="grid-table"> 



  </div>
  </div>
</body>
<script src="script.js"></script>
<?php

// Connexion à la base de données
try {
    $mySQLClient = new PDO('mysql:host=localhost;dbname=memorizdb;charset=utf8', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur de connexion à la base de données : ' . $e->getMessage()]);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['username'], $_POST['password'])) {
        $pseudo = $_POST['username'];
        $password = $_POST['password'];
    
    // Vérification si l'utilisateur existe déjà
    try {
        $query = "SELECT id_user, password_user FROM users WHERE pseudo_user = :pseudo_user";
        $stmt = $mySQLClient->prepare($query);
        $stmt->execute(['pseudo_user' => $pseudo]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            // Créer un nouvel utilisateur
            $createUserQuery = "INSERT INTO users (pseudo_user, password_user) VALUES (:pseudo_user, :password_user)";
            $createUserStmt = $mySQLClient->prepare($createUserQuery);
            $createUserStmt->execute(['pseudo_user' => $pseudo, 'password_user' => $password]);
            
            $maVariable = htmlspecialchars($pseudo, ENT_QUOTES, "UTF-8");
            echo '<input type="hidden" id="maVariable" value="' . $maVariable . '">';
            
            
            
        } elseif ($user['password_user'] !== $password) {
          echo '<script>alert("Mot de passe incorrect !");</script>';
            exit;
        } else {
            
            $maVariable = htmlspecialchars($pseudo, ENT_QUOTES, "UTF-8");
            echo '<input type="hidden" id="maVariable" value="' . $maVariable . '">';
            
            
            
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la vérification de l\'utilisateur : ' . $e->getMessage()]);
        exit;
    }
    }
}
?>


</html>