<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">
    <title>Projet Datavisualisation</title>
    <!-- Normalize CSS -->
    <link href="./assets/css/normalize.css" rel="stylesheet">
    <!-- Bootstrap core CSS -->
    <link href="./assets/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="./assets/css/style.css" rel="stylesheet">
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>
        window.jQuery || document.write('<script src="./assets/js/jquery.min.js"><\/script>')
    </script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <!-- D3 -->
    <script type="text/javascript" src="./assets/js/d3.v3.js"></script>
    <script type="text/javascript" src="./assets/js/wordcloud.js"></script>
    <script src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script>
    <script type="text/javascript" src="./assets/js/chart-nuage.js"></script>
    <script type="text/javascript" src="./assets/js/chart-baton.js"></script>
    <script type="text/javascript" src="./assets/js/chart-treemap.js"></script>-->
    <script type="text/javascript" src="./assets/js/chart-cloud.js"></script>
    <script src="./assets/js/script.js"></script>
</head>

<body>
    <div class="blog-masthead">
        <div class="container">
            <nav class="blog-nav"> <a class="blog-nav-item active" href="#">Home</a> <a class="blog-nav-item" href="#graph-1">Graph 1</a> <a class="blog-nav-item" href="#graph-2">Graph 2</a> <a class="blog-nav-item" href="#graph-3">Graph 3</a> <a class="blog-nav-item" href="#graph-4">Graph 4</a> </nav>
        </div>
    </div>
    <div class="container heading full-height">
        <div class="blog-header">
            <h1 class="blog-title">Projet Datavisualisation</h1>
            <p class="lead blog-description">Dans le cadre du projet de Datavisualisation, nous avons réalisé une data visualisation à partir des données retourné par l'un des principaux site pornographique.</p>
            <p class="lead blog-description">Ces données sont mis en forme à l'aide de graphique réalisé avec D3.js. Si vous rencontrez des problèmes, merci de recharger la page si une visualisation ne fonctionne pas .</p>
            <div class="text-center">
                <button id="loadData" type="button" class="btn btn-success btn-lg">Charger les données <span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span></button>
            </div>
        </div>
    </div>
    <div class="container blog-container">
        <div class="row">
            <div class="col-sm-8 blog-main">
                <div id="graph-1" class="blog-post">
                    <h2 class="blog-post-title">Graph 1</h2>
                    <p class="blog-post-meta">Popularité des tags en fonction des années</p>
                    <div id="chart-1"></div>
                </div>
                <!-- /.blog-post -->
                <div id="graph-2" class="blog-post">
                    <h2 class="blog-post-title">Graph 2</h2>
                    <p class="blog-post-meta">Description du graph 1</p>
                    <div id="chart-2"></div>
                </div>
                <!-- /.blog-post -->
                <div id="graph-3" class="blog-post">
                    <h2 class="blog-post-title">Graph 3</h2>
                    <p class="blog-post-meta">Description du graph 3</p>
                    <p>
                        Sélectionner l'année que vous voulez afficher :
                        <select id="graph3_year_filter" >
                            <option value="2007" >2007</option>
                            <option value="2008" >2008</option>
                            <option value="2009" >2009</option>
                            <option value="2010" >2010</option>
                            <option value="2011" >2011</option>
                            <option value="2012" >2012</option>
                            <option value="2013" >2013</option>
                        </select>
                        <i id="refresh_graph3_year" class="glyphicon glyphicon-refresh normal-right-spinner hidden" ></i>
                    </p>
                    <div id="chart-3" style="width: 100%; height: 500px;"></div>
                </div>
                <!-- /.blog-post -->
                <div class="blog-post">
                    <h2 class="blog-post-title">Graph 4</h2>
                    <p class="blog-post-meta">Cette dataviz montre les mots les plus utilisés dans les descriptions des videos</p>
                    <canvas id="graph-4" width="800" height="400"></canvas>
                </div>
                <!-- /.blog-post -->
            </div>
            <!-- /.blog-main -->
            <div class="col-sm-3 col-sm-offset-1 blog-sidebar">
                <div class="sidebar-module">
                    <h4>Archives</h4>
                    <ol class="list-unstyled">
                        <li><a href="#graph-1">Graph 1</a></li>
                        <li><a href="#graph-2">Graph 2</a></li>
                        <li><a href="#graph-3">Graph 3</a></li>
                        <li><a href="#graph-4">Graph 4</a></li>
                    </ol>
                </div>
            </div>
            <!-- /.blog-sidebar -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
    <footer class="blog-footer">
        <p>Ressources utilisées : <a href="http://sexualitics.github.io/">Dataset</a> - <a href="http://www.freekteunen.com/groupassignment/">Idée</a></p>
        <p> <a href="#">Back to top</a> </p>
    </footer>
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <script src="./assets/js/tether.min.js"></script>
    <script src="./assets/js/bootstrap.min.js"></script>
</body>

</html>