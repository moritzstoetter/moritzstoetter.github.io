---
title: "Das Argument für Abstraktionen und Ausdrucksstärke: Weniger ist mehr"
author: "Moritz Stötter"
date: 2023-12-09
image: "../assets/tree.png" # https://docs.astro.build/en/guides/images/#images-in-content-collections
imageAlt: "rooted"
tags: ["development", "cpp"]
---


In der Welt der Softwareentwicklung gibt es eine ungeliebte Wahrheit: **jede Zeile Code, die wir kreieren, ist niemals nur ein Fortschritt, sondern auch immer eine Belastung**. Diese Ambivalenz ist der Grund, warum Abstraktionen und Ausdrucksstärke im Code nicht nur vorteilhaft, sondern für die Erstellung robuster, wartbarer Softwaresysteme unerlässlich sind, insbesondere wenn die Komplexität zunimmt.

### Das zweischneidige Schwert von Programmcode

Der Code, den wir schreiben, dient einem Zweck. Das kann die Lösung eines Problems oder der Implementierung einer Funktion seine. Gleichzeitig stellt jede Zeile jedoch auch eine potenzielle Quelle für Fehler, Missverständnisse und zukünftige Wartungsprobleme dar. Je größer die Codebasis wird, desto größer wird auch die Belastung, in Hinblick auf Verständnis, Fehlersuche und notwendige Änderungen. Hier kommt die Macht der Abstraktion und des ausdrucksstarken Codes ins Spiel. 

### Verzicht auf manuelle Schleifen

Ein Programmierparadigma in dieser Richtung, das von dem großartigen Sean Parent propagiert wurde, ist „No Raw Loops“. Damit wird der Code von imperativen „Wie soll ich vorgehen“-Anweisungen in deklarative Ausdrücke für „Was soll ich tun“ umgewandelt. 

Betrachten Sie zum Beispiel das folgende Stück Code:

```cpp
std::vector<int> prices = {10, 20, 30, 40, 50};
std::vector<double> discounted_prices;

for (size_t i = 0; i < prices.size(); i++) {
    if(prices[i] > 20) {
        discounted_prices.push_back(prices[i] * 0.9);
    }
}

double total = 0;
for (size_t i = 0; i < discounted_prices.size(); i++) {
    total += discounted_prices[i];
}
```

Zweifellos sind Sie in der Lage, herauszufinden, was dies bewirkt, aber genau das müssten Sie tun. Es herausfinden.

Betrachten Sie im Gegensatz dazu den folgenden Codeschnipsel, der das Gleiche tut, ohne rohe Schleifen zu verwenden:

```cpp
std::vector<int> prices = {10, 20, 30, 40, 50};

auto total = prices 
    | std::views::filter([](int price) { return price > 20; })
    | std::views::transform([](int price) { return price * 0.9; })
    | std::ranges::fold_left(0.0, std::plus<>());
```

Unabhängig davon, ob Sie mit der Ranges-Bibliothek von C++20 vertraut sind, bin ich zuversichtlich, dass Sie diese vier Zeilen lesen und direkt verstehen können, was hier passiert. Dies ist einfach viel aussagekräftiger als das vorherige Snippet und macht es somit einfacher, über den Code nachzudenken und potenzielle Fehler zu erkennen. Ein zusätzlicher Vorteil dieses Ansatzes besteht darin, dass einige Fehler, z. B. Off-by-One-Fehler und Begrenzungsfehler, vermieden oder reduziert werden. Und es gibt noch mehr: Jede Operation ist isoliert und zusammensetzbar, so dass sich der Code leichter testen und ändern lässt. 

### Abstraktion: Komplexität verbergen, Intentionen offenlegen 

Der Kern dieser Transformation besteht darin, dass die Operationen aus der konkreten Anwendung extrahiert und in abstrakter und generischer Form zu *filter*, *transform* und *fold_left* verdichtet wurden. Jetzt können sie auf alle Arten von Anwendungsfällen angewendet werden. Dies ermöglicht es uns, komplexe Operationen hinter einfachen Schnittstellen zu kapseln. Auf diese Weise reduzieren wir die Menge an Code, die zu einem bestimmten Zeitpunkt gelesen, verstanden und gepflegt werden muss. Eine gut durchdachte Abstraktion verbirgt Implementierungsdetails, während sie die Absicht klar kommuniziert. Bei sorgfältiger Anwendung dieser Technik entstehen keine Laufzeitkosten (*Null-Kosten-Abstraktion*).

### Die kumulierten Vorteile 

Wenn wir uns Abstraktionen zu eigen machen und nach aussagekräftigerem Code streben, profitieren wir von weiteren Vorteilen:  

**Reduzierte kognitive Belastung**: Entwickler können sich auf High-Level-Logik statt auf Low-Level-Implementierungsdetails konzentrieren. 
Verbesserte Wartbarkeit: Mit weniger Code und einer klareren Absicht werden zukünftige Änderungen einfacher und weniger fehleranfällig. 

**Verbesserte Zusammenarbeit**: Code, der seine Absicht klar zum Ausdruck bringt, erleichtert die Teamarbeit und den Wissensaustausch. 

**Schnellere Entwicklung**: Abstraktionen auf höherer Ebene ermöglichen die Implementierung und Iteration durch Wiederverwendung. 

**Weniger Bugs**: Indem wir die Menge an manuellem, sich wiederholendem Code verringern, minimieren wir die Oberfläche für potenzielle Fehler.

Bei der Einführung von Abstraktionen und dem Streben nach Ausdruckskraft geht es nicht um eine dogmatische Reduzierung der Zeilenzahl. Vielmehr geht es darum, unseren Code so zu gestalten, dass er möglichst klar und möglichst wenig komplex ist. Dieser Ansatz erfordert eine neue Denkweise: 

1. Bevorzugen Sie deklarativen gegenüber imperativem Code, wo immer dies möglich ist. 
2. Investieren Sie Zeit in den Entwurf guter Abstraktionen, die die Komplexität verbergen. 
3. Nutzen Sie Sprachfunktionen und Bibliotheken, die die Ausdruckskraft fördern. 
4. Kontinuierliches Refactoring, um die Klarheit zu verbessern und Redundanz zu reduzieren. 

Denken Sie daran, dass das Ziel nie nur funktionierender Code ist, sondern Code, der seine Absicht klar kommuniziert und potenzielle Fehlerquellen minimiert. Indem wir jede Codezeile sowohl als Vorteil als auch als Belastung betrachten, werden wir in unseren Entwicklungspraktiken kritischer. Wir lernen, Klarheit und Prägnanz zu schätzen, nicht um ihrer selbst willen, sondern wegen der greifbaren Vorteile, die sie unseren Softwareprojekten bringen. Letztendlich ist der beste Code oft nicht der Code, den wir schreiben, sondern der Code, den wir nicht schreiben müssen, weil unsere Abstraktionen und ausdrucksstarken Konstrukte dies bereits für uns erledigt haben.