var types = ["APPETIZERS AND SNACKS","BEEF DISHES","BEVERAGES","BREADS AND CEREALS","COOKIES","COOKIES/SWEET SNACKS","DESSERTS","EGGS AND PORK DISHES","EGGS, BREAKFAST, AND PORK DISHES","FISH","GIFTS AND MISCELLANEOUS","GROUP RECIPES","MISCELLANEOUS AND TASTY GIFTS","PASTA AND STARCHES","POULTRY","SALADS","SANDWICHES","SAUCES, JELLIES, AND DRESSINGS","SOUPS","SPECIAL OCCASIONS","VEGETABLES AND FRUITS"];
            
            var subsetOfRecipes = [];
            initialize();
            
            function initialize(){
                randomize();
            }
            
            function randomize(){
                subsetOfRecipes = [];
                var recipe = recipes[Math.floor(Math.random()*recipes.length)];
                subsetOfRecipes.push(recipe);
                
                drawCards();
            }
            
            function createCard(recipe){
                var html = "<div class='card'>";
                html+= "<h4 class='card-type'>"+recipe.type+"</h4>";
                html+= "<h1 class='card-title'>"+recipe.title+"</h1>";
                html+= "<p class='card-text'>"+recipe.recipe.replace(/\n/g,"<br>")+"</p>";
                html+= "</div>";
                return html;
            }
            
            function search(){
                var query = document.getElementById("search").value;
                query = query.toLowerCase();
                var searchType = document.getElementById("category").checked;
                var searchTitle = document.getElementById("title").checked;
                var searchRecipe = document.getElementById("recipeText").checked;
                if(query.length > 2){
                    subsetOfRecipes = recipes.filter(function(cur){
                        return (
                                   (searchType && cur.type.toLowerCase().indexOf(query) > -1) 
                                || (searchTitle && cur.title.toLowerCase().indexOf(query) > -1)
                                || (searchRecipe && cur.recipe.toLowerCase().indexOf(query) > -1)
                               );
                    });
                    drawCards();
                }
            }
            
            function categorySearch(item){
                var categorySearchText = (item.srcElement.childNodes[0].data || "");
                subsetOfRecipes = recipes.filter(function(cur){
                    return cur.type.toUpperCase() == categorySearchText;
                });
                drawCards();
            }
            
            function drawCards(){
                
                var html ="";
                for(var i=0; i< subsetOfRecipes.length;i++){
                     html += createCard(subsetOfRecipes[i]);
                }
                document.getElementById("recipe").innerHTML = html;
                document.getElementById("overview").innerHTML = "Found " + subsetOfRecipes.length + " Recipe" + (subsetOfRecipes.length !=1 ?"s.":".");
            }
            
            //listeners
            var categorySearchButtons = document.getElementsByClassName("category-search");
            for(var i=0;i<categorySearchButtons.length;i++){
                categorySearchButtons[i].addEventListener("click", categorySearch);
            }
            document.getElementById("search").addEventListener("keyup", search);
            document.getElementById("random").addEventListener("click", initialize);