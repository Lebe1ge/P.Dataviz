<?php
namespace Database;
use PDO;

/**
 * Objet Database
 * Interactions avec la base de données
 */
class Database
{
    private $instance = null;
    private $table = null;

    /**
     * Database constructor.
     */
    public function __construct(){
		try {
			$this->instance = new PDO(DSN, USER, PWD);
		} catch (PDOException $e) {
			echo 'Connexion échouée : ' . $e->getMessage();
		}
	}

    /**
     * Set table
     * @param $table
     */
    protected function setTable($table){
        $this->table = $table;
    }

    /**
     * Get PDO Instance
     * @return null|PDO
     */
    protected function getInstance(){
        return $this->instance;
    }

    /**
     * Save data
     * @param $data
     * @return int
     */
    protected function save($data){
        $bdd = $this->getInstance();
        $bind = array();

        if(isset($data['action'])) { unset($data['action']); }

        // Si id existe déjà et n'est pas vide
        if(isset($data['id'])) {
            $sql ="UPDATE ".$this->table." SET ";
            foreach ($data as $key=>$value) {
                if($key!="token") {
                    $sql .= " $key = :$key,";
                    $bind[":" . $key] = utf8_decode($value);
                }
            }
            $sql = substr($sql,0,-1);

            $sql .= ' WHERE token = :token';
            $bind[":token"] = $data['token'];
        } else {
            $sql ="INSERT INTO ".$this->table." (";
            unset($data["id"]);
            foreach ($data as $key=>$value) {
                $sql .= " $key,";
            }
            $sql = substr($sql,0,-1); 

            $sql .= " ) VALUES ( ";
            foreach ($data as $key=>$value) {
                $sql .= " :$key,";
                $bind[":" . $key] = utf8_decode($value);
            }
            $sql = substr($sql,0,-1);
            $sql .=")";
		}
        $stmt = $bdd->prepare($sql);
        if($stmt->execute($bind))
            return 1;
        else
            return -1;
}

    /**
     * Get data
     * @param array $data
     * @return array
     */
    protected function show($data=array()){
        $bdd = $this->getInstance();
        $conditions = array("1" => "1");
        $cdt = "";
        $fields = "*";
        $limit = "";
        $order = "id DESC";
        $bind = "";
        $d = array();
        extract($data);
        if(isset($data['limit'])){$limit = "LIMIT ".$data['limit'];}
        foreach($conditions as $k => $v){
            $cdt .= $k . " = :" . $k . " AND ";
            $bind[":".$k] = utf8_decode($v);
        }
        $sql = "SELECT ".$fields." FROM ".$this->table." WHERE ".substr($cdt,0,-5)." ORDER BY ".$order." ".$limit;

        $stmt = $bdd->prepare($sql);
        
        //var_dump($sql);

		if($stmt->execute($bind)) {
            while($data = $stmt->fetch(PDO::FETCH_ASSOC)) {
                foreach($data as $key => &$value) {
                    $value = utf8_encode($value);
                }
                array_push($d, $data);
            }
            return $d;
		} else
            return false;
    }

    /**
     * Get one data
     * @param $array
     * @return bool
     */
    protected function getOne($array){
        if($data = $this->show(array('conditions' => $array)))
            return $data[0];
        else
            return false;
    }

}