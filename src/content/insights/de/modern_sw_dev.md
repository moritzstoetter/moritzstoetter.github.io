---
title: "Warum moderne Mikrocontroller moderne Methoden brauchen"
author: "Moritz Stötter"
date: 2023-10-06
image: "../assets/yarn.webp" # https://docs.astro.build/en/guides/images/#images-in-content-collections
imageAlt: "order from chaos"
tags: ["development", "consulting", "cpp"]
---

### Embedded Devices sind nicht mehr das, was sie früher waren 

Viele der heutigen Mikrocontroller können mit den Rechenkapazitäten von Desktop-CPUs aus den 1990er und frühen 2000er Jahren mithalten oder übertreffen diese sogar. Ein typischer moderner ARM Cortex-M4-Mikrocontroller kann beispielsweise mit einer Taktfrequenz von 200 MHz arbeiten, vergleichbar mit High-End-Desktop-Prozessoren aus den späten 1990er Jahren. Auch die Speicherkapazität ist erheblich gewachsen: Einige Mikrocontroller bieten mehrere Megabyte RAM und Flash-Speicher und spielen damit in der gleichen Liga wie PCs aus dieser Zeit. Damit können moderne Mikrocontroller Aufgaben bewältigen, für die früher ein kompletter Desktop-Computer erforderlich gewesen wäre. 

### Embedded Software ist komplexer geworden 

Diese Leistungssteigerung ging natürlich auch mit immer aufwändiger werdenden Anwendungen einher. Besonders in den letzten zehn Jahren hat Embedded Software eine dramatische Entwicklung hinsichtlich ihrer Komplexität erfahren. Heute enthält Firmware oft Echtzeit-Betriebssysteme, komplexe Kommunikations-Stacks, fortschrittliche Signalverarbeitungsalgorithmen, Modelle für maschinelles Lernen und grafische Benutzeroberflächen, sie soll aus der Ferne gewartet werden können, energieeffizient sein und Sicherheits- und Datenschutzstandards genügen.

Diese zunehmende Komplexität hat die Einführung von fortschrittlicheren Entwicklungswerkzeugen, Debugging-Techniken und Software-Architekturen erforderlich gemacht und zwingt Embedded-Entwickler dazu, ihre Fähigkeiten zu erweitern und Praktiken zu übernehmen, die traditionell mit der Entwicklung größerer Software verbunden sind. 

### Das Feld steht noch am Anfang 

Viele Embedded-Projekte beruhen jedoch immer noch auf veralteten Entwicklungsmethoden und -werkzeugen, die für moderne Herausforderungen nicht geeignet sind. Typische Implementierungen bleiben oft undurchsichtig und zeichnen sich durch monolithische Codebases, starke Abhängigkeiten zu herstellerspezifischen IDEs, SDKs und Tools, minimale Abstraktion und starker Verwendung von Low-Level-Programmierung auf allen Ebenen aus. All das behindert die Einführung moderner Entwicklungsabläufe, wirkt sich negativ auf die Produktivität aus, und stellt ein Risiko für die Wartbarkeit, Erweiterbarkeit, Testbarkeit, Skalierbarkeit und Sicherheit des Produkts dar. 

### Wir sind schon weiter 

Schon seit vielen Jahren setzen wir bei modern embedded in unseren Projekten ausschließlich generische Werkzeuge ein, die sich als Goldstandards in ihrem Einsatzgebiet herausgebildet haben. Damit allein lösen wir bereits eine Vielzahl an Problemen, wie zum Beispiel Kompatibilität zu anderen Komponenten des Entwicklungsprozesses oder mangelnde Portabilität, und machen den Weg frei für moderne Entwicklungsabläufe, wie automatisierte Tests und CI/CD. 

Um den Herausforderungen rund um die eigentliche Programmierung zu begegnen, setzen wir modernes C++ ein. C++ bietet, wenn es gekonnt auf eingebettete Systeme angewandt wird, leistungsstarke Werkzeuge, um die wachsende Komplexität von Mikrocontroller-Software zu bewältigen. Im Vergleich zu C bietet C++ expressivere Abstraktionsmechanismen, mit denen wir modulare, formbare Architekturen erstellen. So erstellen wir beispielsweise mit Template-Metaprogramming und manchen objektorientierten Techniken ausdrucksstärkeren, sichereren Code, der abstraktes Verhalten klar von hardwarespezifischen Implementierungen trennt, ohne dabei Abstriche bei der Laufzeit-Performanz zu machen. 

Mit unserer vielfach erprobten und eigens für Mikrocontroller entwickelten Template-Library und ausgewählten Elementen der C++ Standard Template Library, verschieben wir die Implementierungsdetails in tiefere Schichten, damit sich die Entwickler auf die High-Level-Funktionalität konzentrieren können. Dieser Ansatz ermöglicht eine bessere Codeorganisation, verbessert die Les- und Testbarkeit und ermöglicht eine einfachere Portierung zwischen verschiedenen Mikrocontroller-Familien. 

### Das Problem löst sich nicht selbst 

Embedded Entwicklung hat sich in den letzten Jahren drastisch weiterentwickelt, und dieser Trend wird sich aller Voraussicht nach noch weiter fortsetzen. Wer jetzt nicht auf moderne Softwareentwicklungstechniken setzt, wird an einen Punkt gelangen, an dem sein Produkt mit den steigenden Anforderungen nicht mehr Schritt halten kann, falls er ihn nicht schon erreicht hat. 