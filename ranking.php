<?php
header('Content-Type: application/json');

// Connexion à la base de données
try {
    $mySQLClient = new PDO('mysql:host=localhost;dbname=memorizdb;charset=utf8', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur de connexion à la base de données : ' . $e->getMessage()]);
    exit;
}

// Vérification du type de requête
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
            $userId = $mySQLClient->lastInsertId();

            echo json_encode(['status' => 'success', 'message' => 'Nouvel utilisateur créé.', 'id_user' => $userId]);
            exit;
        } elseif ($user['password_user'] !== $password) {
            echo json_encode(['status' => 'error', 'message' => 'Mot de passe incorrect.']);
            exit;
        } else {
            // L'utilisateur existe et le mot de passe est correct
            echo json_encode(['status' => 'success', 'message' => 'Connexion réussie.', 'id_user' => $user['id_user']]);
            exit;
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la vérification de l\'utilisateur : ' . $e->getMessage()]);
        exit;
    }
}

// Traitement des scores
if (isset($input['coup'], $input['time'], $input['level'], $input['username'])) {
    $coups = $input['coup'];
    $time = $input['time'];
    $level = $input['level'];
    $pseudo = $input['username'];

    try {
        $querySaveScore = "INSERT INTO score (coup_score, time_score, level_score, id_user)
            VALUES (:coup_score, :time_score, :level_score, (SELECT id_user FROM users WHERE pseudo_user = :pseudo_user))";
        $saveScoreStmt = $mySQLClient->prepare($querySaveScore);
        $saveScoreStmt->execute([
            'coup_score' => $coups,
            'time_score' => $time,
            'level_score' => $level,
            'pseudo_user' => $pseudo
        ]);

        echo json_encode(['status' => 'success', 'message' => 'Score enregistré avec succès.']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'enregistrement du score : ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Données de score manquantes ou invalides.']);
    exit;
}
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
    ORDER BY score.level_score DESC, score.coup_score, score.time_score DESC
    
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
        echo "<td>". htmlspecialchars($row['date_score']) . "</td>";
        echo "<td>" . htmlspecialchars($row['level_score']) . "</td>";
        echo "<td>" . htmlspecialchars($row['date_score']) . "</td>";
        echo "</tr>";
    }

    echo "</table>";
} else {
    echo "Aucun enregistrement trouvé.";
}

// Fermer la connexion
$conn->close();}
?>