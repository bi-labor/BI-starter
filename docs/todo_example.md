# AngularJS példa - Todo alkalmazás

## Kiindulás
Nyissunk egy plnkr-t (http://plnkr.co/edit) és adjuk a kezdeti projektünkhöz hozzá az AngularJS libet.

Ezek után a HTML kód így fog kinézni: 

```html
<!DOCTYPE html>
<html>
  <head>
    <script data-require="angular.js@1.6.1" data-semver="1.6.1" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.js"></script>
    <link rel="stylesheet" href="style.css" />
    <script src="script.js"></script>
  </head>
  <body>
    <h1>Todo alkalmazás</h1>
  </body>
</html>
```

Ehhez tartozik egy üres `script.js` és `style.css` fájl.

## Modul és kontroller létrehozása
Hozzunk létre egy *TodoApp* nevű modult és egy hozzá tartozó *TodoCtrl* nevű kontrollert a script.js fájlban. A `script.js` tartalma ezek után: 

```javascript
var app = angular.module("TodoApp", []);

app.controller('TodoCtrl',function($scope){
  $scope.test = "test";
});
```

Ezek után kössük be a modult és a kontrollert a template-be, valamint irassuk ki a *test* változó tartalmát, csak, hogy lássuk valóban működik az alkalmazás: 

```html
 <body ng-app="TodoApp">
    <h1>Todo alkalmazás</h1>
    <div ng-controller="TodoCtrl">
       {{ test }}
    </div>
  </body>
```

## Új Todo hozzáadása

Új Todo hozzáadásához vegyük fel a Todo-k tárolására a `todos` tömböt, valamit a hozzáadást végző `addTodo` függvényt.
Ez utóbbi akkor veszi fel az új Todo-t, ha a felhasználó entert nyom és a beírt szöveg nem üres.

```javascript
$scope.todos = [];
  
$scope.addTodo = function(event) {
  if(event.keyCode == 13 && $scope.todoText){
      $scope.todos.push({text:$scope.todoText, done:false});
      $scope.todoText = '';
  }
};
```

Todo beviteli mező hozzáadása: 

```html
<input id="new-todo" type="text" ng-model="todoText" size="30" placeholder="Új todo szövege" ng-keyup="addTodo($event)" />
```

## Todo-k listázása

Az input mező alá vegyünk egy listát, mely a Todo-kat fogja kiírni, minden Todo mellé rakjunk egy checkboxt is, amivel az adott Todo-t készre állíthatjuk. 

```html
<ul id="todo-list">
  <li ng-repeat="todo in todos">
    <div>
       <label ng-class="{'todo-done': todo.done}">
        <input type="checkbox" ng-model="todo.done" />
          {{todo.text}}
       </label>
    </div>
  </li>
</ul>
```

## Összes Todo késznek jelölése, Todo-k törlése

Összes Todo kijelölése, és a kijelölt Todo-k törlés funkciójához két gombot vegyünk fel a HTML fájlban:

```html
<div ng-if="todos.length > 0">
  <button ng-click="markAll()">
    Minden Todo késznek jelölése
  </button>
  <button ng-click="clearAll()">
    Elvégzett todo-k törlése
  </button>
</div>
```

A `script.js` fájlban implementáljuk ezt a két függvényt: 

```javascript
  $scope.markAll = function() {
    angular.forEach($scope.todos, function(todo) {
      todo.done = true;
    });
  };

  $scope.clearAll = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
```

## Formázás 

Végül a style.css-be minimális formázás: 

```css

#todo-list {
    margin: 10px 0;
    padding: 0;
    list-style: none;
}

.todo-done{
  text-decoration: line-through;
}
```
