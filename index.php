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
    
    <div class="buttons">
      <p>Choisissez un niveau pour commencer :</p>
      <a href="#" onclick="setLevel(1)" class="btn" id="facile" >Niveau Facile</a>
      <a href="#" onclick="setLevel(2)" class="btn">Niveau Moyen</a>
      <a href="#" onclick="setLevel(3)" class="btn">Niveau Difficile</a>
      <a href="ranking.php" class="btn">Classement</a>
</div></div>
    <div id="main">
      <button onclick="startGame()" class="start-button">Démarrer</button>
  
  <div class="grid-table"> 



  </div>
  </div>
</body>
<script src="script.js"></script>

</html>