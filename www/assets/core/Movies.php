<?php
namespace Movies;
use Database\Database;

/**
 * Objet Etudiant
 * Interactions avec la base de données
 */
class Movies extends Database
{
    protected $data = array();
    protected $message = '';

    /**
     * Student constructor.
     */
    public function __construct(){
        parent::__construct();
        $this->setTable("xhamster");
	}

    /**
     * Get All Movies
     * @param $conditions
     * @return table
     */
    public function getAllMovies() {
        return $this->show(array('conditions' => array('id', 1)));
    }

    /**
     * Get Movies by years
     * @param $years
     * @return table
     */
    public function getMoviesByYears($years = '2007') {
        return $this->show(array('cdt' => 'upload_date LIKE "'.$years.'%" AND '));
    }

    /**
     * Count tags by years
     * @param $years
     * @return table
     */
    public function countTagsByYears($years = '2007') {
        $result['name'] = $years;
        $result['children'] = array();
        
        $data = $this->show(array('fields' => 'channels, nb_views','cdt' => 'upload_date LIKE "'.$years.'%" AND '));
        
        foreach($data as $d){
            $channels = explode(",", str_replace(array("[", "]", "'", " "), '', $d['channels']));
            
            foreach($channels as $ch){
                if(array_key_exists($ch, $result['children'])){
                    $result['children'][$ch]['size']++;
                    $result['children'][$ch]['nb_views'] += $d['nb_views'];
                } else {
                    $result['children'][$ch]['name'] = $ch;
                    $result['children'][$ch]['size'] = 1;
                    $result['children'][$ch]['nb_views'] = $d['nb_views'];
                }
            }
        }
        rsort($result['children'], SORT_REGULAR);
        return $result;
    }

    /**
     * Count tags by years
     * @param $years
     * @return table
     */
    public function countFamilyByTitle() {
        $result['name'] = "Family";
        $result['children'] = array();
        
        $result['children'] = $this->show(
            array(
                'fields' => "case 
                    when title like '%mother%' then 'Mother'
                    when title like '%father%' then 'Father'
                    when title like '%brother%' then 'Brother'
                    when title like '%sister%' then 'Sister'
                    when title like '%daughter%' then 'Daughter'
                    end as name,
                    count(*) as count, SUM(nb_views) as nb_views",
                'cdt' => 
                    "title like '%mother%' 
                    OR title like '%father%' 
                    OR title like '%brother%' 
                    OR title like '%sister%' 
                    OR title like '%daughter%'
                    AND ",
                'group' => "name"));
        
        //var_dump($data);
        return $result;
    }


    public function countViewByDate($year = 2007){

        $args = array(  'fields'    => 'DATEDIFF(DATE(NOW()), upload_date) AS DateDiff, nb_views, title, channels',
                        'cdt'       => "upload_date IS NOT NULL AND upload_date != 'NA' AND DATEDIFF(upload_date, DATE(NOW())) IS NOT NULL AND upload_date BETWEEN '" . $year . "-01-01' AND '" . $year . "-31-12' AND ",
                        'order'     => 'nb_views DESC',
                        'limit'     => ' 1000'
                    );

        return $this->show($args);

    }

    /**
    * Count vote by date
    * @param $years
    * @return table
    **/

    public function countVoteByDate( $year = 2007 ){

        $args = array( 'fields' => 'nb_votes, nb_comments, title, YEAR(upload_date) as year',
                       'cdt'    => " upload_date IS NOT NULL AND upload_date != 'NA' AND DATEDIFF(upload_date, DATE(NOW())) IS NOT NULL AND upload_date BETWEEN '" . $year . "-01-01' AND '" . $year . "-31-12' AND ",
                       'order'  => 'nb_votes DESC',
                       'limit'  => ' 5'
                     );
        return $this->show( $args );
    }    


    public function getWords(){
        $args = array( 'fields' => 'channels',
            'limit'     => ' 300');

        $descriptions = $this->show($args);

        return $descriptions;
    }


}