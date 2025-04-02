<?php
echo '<link rel="stylesheet" type="text/css" href="ranking.css">';

// Ajouter un cookie pour détecter la fermeture de l'onglet


// Connexion à la base de données
try {
    $mySQLClient = new PDO('mysql:host=localhost;dbname=memorizdb;charset=utf8', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        
    ]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur de connexion à la base de données : ' . $e->getMessage()]);
    exit;
}

// Vérification si l'utilisateur a déjà envoyer les données 
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['username'] )) {
    echo json_encode(['status' => 'success', 'message' => 'connecter avec succès.']);


// Vérification des paramètres GET
if (isset($_GET['username'], $_GET['coup'], $_GET['time'], $_GET['level'])) {
    $username = $_GET['username'];
    $coup = $_GET['coup'];
    $time = $_GET['time'];
    $level = $_GET['level'];

    try {
        

// Ajouter un cookie pour détecter la fermeture de l'onglet

        // Insertion des scores dans la table "score"
        $querySaveScore = "INSERT INTO score (coup_score, time_score, level_score, id_user)
            VALUES (:coup_score, :time_score, :level_score,
                (SELECT id_user FROM users WHERE pseudo_user = :username))";
        $saveScoreStmt = $mySQLClient->prepare($querySaveScore);
        $saveScoreStmt->execute([
            'coup_score' => $coup,
            'time_score' => $time,
            'level_score' => $level,
            'username' => $username
        ]);

        echo json_encode(['status' => 'success', 'message' => 'Score enregistré avec succès.']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'enregistrement du score : ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Paramètres manquants.']);
} 
// Rediriger l'utilisateur vers la page index
header("Location: index.php");}

?>

<?php
// Connexion à la base de données
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'memorizdb';

$conn = new mysqli($host, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Requête pour récupérer les noms des utilisateurs et leurs scores
$sql = "
    SELECT users.pseudo_user AS username, score.coup_score , score.time_score, score.date_score, score.level_score
    FROM users
    JOIN score ON users.id_user = score.id_user
    WHERE score.coup_score IS NOT NULL AND score.time_score IS NOT NULL AND score.level_score IS NOT NULL
    ORDER BY score.level_score DESC , score.coup_score  
    
";

$result = $conn->query($sql);

// Vérifier si des résultats ont été trouvés
if ($result->num_rows > 0) {
    echo "<h1>Classement des utilisateurs</h1>";
    echo "<table border='1'>";
    echo "<tr><th>Position</th><th>Nom</th><th>Nombre de Coups</th><th>Temps de la partie</th><th>Level</th> <th>Date Partie</th></tr>";

    $position = 1;
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $position++ . "</td>";
        echo "<td>" . htmlspecialchars($row['username']) . "</td>";
        echo "<td>" . htmlspecialchars($row['coup_score']) . "</td>";
        echo "<td>" . htmlspecialchars($row['time_score']) . "</td>";
        echo "<td>" . htmlspecialchars($row['level_score']) . "</td>";
        echo "<td>" . htmlspecialchars($row['date_score']) . "</td>";
        echo "</tr>";
    }

    echo "</table>";
} else {
    echo "Aucun enregistrement trouvé.";
}

// Fermer la connexion
$conn->close();
?>