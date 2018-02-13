# Todo alkalmazás

## Projekt létrehozása

Nyissuk meg a WebStormot és a megjelenő ablakon kattintsunk a "Create New Project" gombra, a feljövő ablak bal oldali listájából pedig az Angular CLI elemet válasszuk. Nevezzük el a projektet tetszőlegesen (pl.: todo). A "Create" gombra kattintva létrejön egy új Angular CLI-s projekt, ez eltarthat néhány percig, a folyamat végére egy kiinduló Angularos alkalmazást kapunk, és az npm-es dependenciák is telepítve lesznek, a programot az `npm start` paranccsal tudjuk elindítani. Ezt a parancsot legkönnyebben a WebStorm "Terminal" ablakában tudjuk kiadni a projekt gyökérkönyvtárából, a Teminal Windows-on alapértelmezetten egy PowerShellt indít (a WebStorm alsó eszköztárában nem lenne kint a Terminal, akkor a Help menüben keressünk rá, és tegyük ki az eszköztárra). Az alkalmazásunkat a [http://localhost:4200-as](http://localhost:4200) címen tudjuk elérni.

### A kiinduló projektről

Néhány szó a generált projekt számunkra érdekes részeiről:
* Az alkalmazás forrás fájljai az `src` mappában találhatóak.
* Az `src/index.html` fájlban található `app-root` elem az alkalmazás root komponense, az allomány tartalma a továbbiakban nem fog módosulni.
* A használt függőségeket a [webpack](https://webpack.js.org) által vezérelt build folyamat fogja importálni, a stíluslapokat azonban nekünk kell beregisztrálnunk a `.angular-cli.json` fájl "style" kulcsához. Ebben a fájlban a projektünk Angular CLI specifikus beállításait találjuk.
* Az `scr/main.ts` fájl az alkalmazás belépési pontja, itt mondjuk meg az Angularnak, hogy böngészőben futó módban indítsa el az alkalmazás gyökérmodulját, ami az "AppModule".
* Az "AppModule" az `src/app/app.module.ts` állományban található. Ez a module jelenleg csak egy másik modult használ, ez a "BrowserModule", ami egy beépített Angularos modul. A `declations` tömbben az általunk készített komponensek listája látható, ez jelenleg csak az "AppComponentet" tartalmazza, a korábban már említett gyökérkomponenst. (Több infó a modulokról a bevezető doksiban olvasható)
* A gyökérkomponens 3 fájlból áll, ezek: `app.component.` + `css`, `html` és `ts`. (A `spec.ts` kiterjesztésű fájl a komponenshez tartozó unit tesztek helye, de ezzel a laboron nem foglalkozunk). (Több infó a komponensekről a bevezető doksiban olvasható)

### Angular CLI

Az AngularCLI egy command-line program, amelyet Angularos alkalmazások fejlesztésének támogatásához készített az Angularos csapat. Feladata kettős: egy részről egy kész build folyamatot ad a fejlesztők kezébe (modern webalkalmazásoknál sok átalakítás szükséges mire a forrás fájlok és külső könyvtárak a böngészőben hatékonyan futtatható fájlokká válnak), más részről pedig a boilerplate kódok írását eliminálja azáltal, hogy command-line parancsok segítségével generálhatunk Angularos elemeket. A laboron meg fogunk ismerkedni a fontosabb parancsokkal.

### Az alkalmazás futtatása

Az alkalmazást az `npm start` paranccsal tudjuk indítani, ez a parancs buildeli az alkalmazást, és elindít egy [webszervert](https://github.com/webpack/webpack-dev-server), ez fogja kiszolgálni az alkalmazásunkat, illetve a forrás fájlok módosulásakor automatikusan újratölti az oldalt, tehát  **fejlesztés közben nem szükséges a szerver leállítása**. Ha mégis le szeretnénk állítani a szervert, akkor a ctrl+c billentyűkombinációval meg tudjuk szakítni a parancs futását.

## Todo-k listázása

### Todo osztály létrehozása
A WebStormos Terminal ablakban (az ablak bal oldali részén a + gombra kattintva tudunk új Terminal ablakot nyitni, hogy ne kelljen leállítani a webszervert) adjuk ki az alábbi parancsot: `ng g class todo`, amellyel egy új TypeScript osztály fogunk létrehozni Todo néven az `src/app` mappában.

Vegyünk fel egy `name` és egy `isDone` változó az osztályba. Kód:
```typescript
export class Todo {
  isDone = false;

  constructor(public name: string) {}
}
```
Az `export` kulcsszó az [ES6-os modulrendszer](http://exploringjs.com/es6/ch_modules.html) része, a konstruktorban történő furcsaság pedig a TypeScriptes [constructor property](https://www.typescriptlang.org/docs/handbook/classes.html).

### Todo-k előállítása
Vegyünk fel nehány todo-t az "AppComponentbe":
```typescript
export class AppComponent {
  todos: Todo[];

  constructor() {
    this.todos = [
      new Todo('Bevezető elolvasása'),
      new Todo('Todo alkalmazás készítése'),
      new Todo('Szavazós alkalmazás kiegészítése'),
      new Todo('Önálló feladatok elvégzése')
    ];
  }
}
```
A WebStorm támogatja az automatikus importot, ha gépelés közben nem sikerült kiválasztani a megfelelő modult, akkor az importálandó elemre kattintva az alt+enter billentyűkombinációval tudjuk az importálást triggerelni.

### Listázás
A todo-k listázásához egy külön komponenst fogunk készíteni, ehhez adjuk ki a következő parancsot: `ng g c todos`. Ennek hatására az "AppModule" `declarations` tömbjébe bekerül a "TodosComponent", valamint az `app/todo` mappában létrejön egy új komponens, amely szintén három fájlból áll, hasonlóan, mint az "AppComponent".

A komponens a listázandó elemeket bemenetként fogja megkapni, bemenet definiálása:
```typescript
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  @Input() todos: Todo[];

  constructor() { }

  ngOnInit() {
  }

}
```
Az "Input" dekorátor importálásánál figyeljünk arra, hogy az  `@angular/core` modulból importáljuk azt.

A todo-k listázásához szükséges HTML kód:
```html
<h1>Todo lista</h1>
<div *ngFor="let todo of todos">
  <input type="checkbox" [checked]="todo.isDone">
  {{todo.name}}
</div>
```
Az előbbi kódrészletben példát láthatunk az ngFor Angularos direktíva használatára, amely egy tömb elemein iterálva minden elemhez beszúr egy általunk meghatározott HTML template-et. A checkbox `checked`  property-je körüli `[ ]`-ek jelzik, hogy a property értékét adatkötéssel állítjuk, a checkbox property-je módosulni fog valahányszor az adatkötött változó értéke módosul. A `{{ }}` is adatkötési szintaxis, ezzel azonban csak sztring értékeket tudunk megjeleníteni (ha nem sztring típusú változó van a zárójelek között, akkor sztringgé alakul), viszont nem csak HTML attribútumokon tudjuk használni, mint a `[ ]`-t. Adatkötni bármely DOM objektum bármely property-jéhez tudunk, a checkbox objektum interfészének leírása [itt](https://www.w3schools.com/jsref/dom_obj_checkbox.asp) érhető el.

A lista megjelenéséhez még el kell helyeznünk a Todos komponenst az "AppComponentben":
```html
<app-todos [todos]="todos"></app-todos>
```
Az "app" prefixet az Angular CLI teszi a komponensek nevei elé, annak érdekében, hogy ne legyen névütközés Angularos, illetve third-party és a saját komponenseink között.

Az alkalmazás a jelnlegi állapotában:

![Todo lista](https://www.dropbox.com/s/zy6qhcdzxz0nf61/Screenshot%202018-02-12%2010.31.43.png?dl=0)

### Egy- illetve kétirányú adatkötés

Próbáljuk ki az adatkötést, és állítsuk át az egyik todo állapotát az "AppComponent" konstruktorában:
```typescript
this.todos[0].isDone = true;
```

Mit gondolunk mi történik a todo elem `isDone` property értékével, ha egy checkbox-t kipipálunk? A kipróbáláshoz az alábbi kódrészlettel egészítsük ki a listázós kódrészletet:
```html
{{todo.isDone}}
```
Az látjuk, hogy az értékek változatlanok maradnak a checkbox-ok változásakor. Ennek oka, hogy az adatkötés jelenleg egyirányú, az `isDone` property változásai megjelennek a checkbox-on, de a checkbox változása nem jelenik meg a property-ben.

Kétirányú adatkötéshez szükségünk van egy eseményre, amelyen keresztül értesülhetünk a checkbox értékének változásáról:
```html
  <input type="checkbox" [checked]="todo.isDone" (change)="todo.isDone = $event.target.checked">
```
A  `change` attribútum körüli `( )`-eket használva tudunk egy eseményre feliratkozni, az attribútumnak paraméterül egy eseménykezelő függvényt kell adnunk, vagy egyszerű, "JavaScript-szerű" (de nem teljes értékű JavaScript) kifejezést, ahogyan a példában is látható. Az esemény objektumot az `$event` változón keresztül érhetjük el. Angularral bármely DOM objektum bármely eseményére feliratkozhatunk (a DOM események mind "on" prefixel rendelkeznek, ezeket el kell hagynunk az Angularos kódban).

Ha valaki imseri az AngularJS-t, akkor azt gondolhatja, hogy ez mennyivel egyszerűbb volt ott, szerencsére Angular-ban is van erre egy egyszerűbb megoldás: az ngModel direktíva.

Ennek használatához be kell importálnunk a "FormsModule"-t az "AppModule"-ba:
```typescript
@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
Ezek után a listázás kódját az alábbiak szerint tudjuk egyszerűsíteni:
```html
<input type="checkbox" [(ngModel)]="todo.isDone">
```
Kipróbálás után láthatjuk, hogy a checkbox változása mostmár az `isDone` property értékét is állítja, ezzel megvalósítottuk a kétirányú adatkötést.

Fontos megjegyezni, hogy az ngModel direktívát nem használhatjuk a saját komponenseinken, ott a kétirányú adatkötést kicsit máshogyan kell megvalósítanunk (de a szintakszis hasonlóan egyszerű lesz, viszont ez nem témája ennek a labornak, ezért nem részletezzük).

### Új todo felvétele

Az új todo felvételét nem fogjuk külön komponensbe kiszervezni, mint a todok listázását, hanem az "AppComponentet" fogjuk kiegészíteni (tehetnénk ezt is külön komponensbe, de nyilván egy ilyen kis alkalmazás esetén nincs jelentősége annak, hogy több komponensbe szervezzük-e az alkalmazásunkat vagy sem).

Először a todo felvételét elvégző függvényt írjuk meg, az "AppComponent" TypeScript osztályt egészítsük ki:
```typescript
addTodo(name: string) {
  this.todos.push(new Todo(name));
}
```
Készítsünk ezek után egy input mezőt, ahova az új todo nevét tudjuk megadni, és hozzá egy gombot, amivel hozzáadni tudjuk az új elemet a meglévő todo-khoz:

```html
<input #newTodoInput>
<button (click)="addTodo(newTodoInput.value)">Hozzáad</button>
```
A `#newTodoInput` kóddal egy új template reference variable-t definiáltunk "newTodoInput" névvel, ezt a típusú változót csak a komponens HTML kódjában érhetjük el (a TypeScript osztályban nem), a változó arra a DOM objektumra mutat, amelyen létrehoztuk, jelen esetben ez az input, amely `value` property-jén keresztül érhetjük a bemeneti mező aktuális értékét (az input objektum teljes [interfészéhez](https://www.w3schools.com/jsref/dom_obj_text.asp) hozzáférünk a változón keresztül).

Utolsó simításként töröljük ki az input mező értékét az új todo létrehozása után:
```html
<button (click)="addTodo(newTodoInput.value); newTodoInput.value = null">Hozzáad</button>
```

Ezzel a Todo alkalmazásunk el is készült.

A kész alkalmazás:

![Kész alkalmazás](https://photos-4.dropbox.com/t/2/AACPX7XzwoLX-XRVbObA1w1FxYgodGGUB7iDdfw6VW9epw/12/51973751/png/32x32/3/1518559200/0/2/Screenshot%202018-02-12%2011.25.52.png/EKeLhCgY95ICIAcoBw/4-gf3Gwmp8o7jI0EvHTMkg7RWM_V796wPx-oMEibq2Y?dl=0&preserve_transparency=1&size=1600x1200&size_mode=3 "Kész alkalmazás")
