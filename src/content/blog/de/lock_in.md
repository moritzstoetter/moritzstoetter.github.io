---
title: "Es gibt keine Zukunft für Werkzeuge, die deine Arbeit als Geisel nehmen"
author: "Moritz Stötter"
date: 2026-01-27
image: "../assets/caged.webp" # https://docs.astro.build/en/guides/images/#images-in-content-collections
imageAlt: "break free"
tags: ["consulting", "development", "cpp"]
---

### Es gibt keine Zukunft für Werkzeuge, die deine Arbeit als Geisel nehmen

In der Welt der Softwareentwicklung bestimmen die Entscheidungen, die Du heute hinsichtlich Deiner Tools triffst, Deine Freiheit von morgen. Allzu oft finden sich Entwicklerteams in Ökosystemen wieder, die sie nie bewusst gewählt haben, zahlen stetig steigende Lizenzgebühren für Tools, die sie nicht ersetzen können, und müssen es schweigend hinnehmen, wenn wichtige Funktionen verschwinden oder nicht weiter entwickelt werden. Dies ist keine nachhaltige Art, Produkte zu entwickeln, und die Branche wird sich langsam einer grundlegenden Wahrheit bewusst: Es gibt keine Zukunft für Werkzeuge, die deine Arbeit in Geiselhaft nehmen.

#### Die Geiselnahme: Beispiele aus der Praxis

Die Softwareindustrie, insbesondere der Embedded-Sektor, ist überschwemmt mit Tools und Frameworks, die zunächst hilfreich erscheinen, sich aber letztendlich eher als Geiselnehmer denn als Partner erweisen. Sehen wir uns einige der häufigsten Übeltäter an.

##### Chip-Anbieter sind nicht Dein Freund

Chip-Anbieter sind gut darin, Dir einen schnellen Einstieg zu ermöglichen. Ein „Hello World”-Beispiel hast Du typischerweise in sehr kurzer Zeit am Laufen. Und die Anbieter liefern in der Regel eine Reihe von Beispielprojekten mit, die Dir auch bei komplexeren Implementierungen den Einstieg erleichtern. Das scheint ein guter Ausgangspunkt zu sein, ist es aber in Wirklichkeit nicht. Warum?

###### Anbieterspezifische Build-Mechanismen

Viele Chip-Anbieter liefern ihre Entwicklungskits mit proprietären Build-Systemen aus, die nur innerhalb ihres Ökosystems funktionieren. Diese Systeme verwenden oft nicht standardisierte Konfigurationsdateien, undurchsichtige Syntax und Build-Prozesse, die es erschweren, zu verstehen, was tatsächlich passiert. Versuche mal Euer Projekt auf den Chip eines anderen Anbieters oder sogar auf eine andere Produktlinie desselben Anbieters umzuziehen, und Du wirst möglicherweise feststellen, dass Du die gesamte Build-Konfiguration von Grund auf neu implementieren darfst.

###### Herstellerspezifische IDEs

Die integrierte Entwicklungsumgebung ist vielleicht die sichtbarste Form der Herstellerabhängigkeit. Diese IDEs bündeln oft den Compiler, den Debugger, das Build-System und das Projektmanagement in einer einzigen monolithischen Anwendung, die sich weigert, mit anderen Anwendungen zusammenzuarbeiten. Eure Projektdateien wiederum sind natürlich außerhalb der IDE  unverständlich. Eure Entwickler müssen also die Eigenheiten eines weiteren Tools lernen. Und Gott bewahre, dass Ihr eine Standard-CI/CD-Pipeline integrieren wollt oder Versionskontrolltools sinnvoll einsetzen möchtet.

##### Frameworks, die alles infizieren

Viele Frameworks haben einen unstillbaren Hunger auf Eure Codebasis. Sie diktieren Projektstruktur, schreiben Euch ihre Code-Konventionen vor, infiltrieren das Build-System und machen es einem schwer, Komponenten zu verwenden, die nicht speziell für ihr Ökosystem entwickelt wurden. Als Resultat ist Euer Anwendungscode schnell so stark mit dem Framework verflochten, dass eine Extraktion einen komplette Rewrite erfordern würde.

##### Codegeneratoren

Grafische Konfigurationstools und Codegeneratoren versprechen, komplexe Initialisierungs- und Konfigurationsaufgaben zu vereinfachen. Sie erstellen aus wenigen Checkbox-Ticks Tausende von Zeilen Boilerplate-Code. Dieser generierte Code ist jedoch oft schlecht dokumentiert, schwer von Hand zu ändern und eng an die spezifische Version des Generators gebunden, mit dem er erstellt wurde. Wenn das Tool aktualisiert wird und sein Ausgabeformat ändert oder wenn Sie etwas tun müssen, was die Entwickler des Tools nicht vorgesehen haben, finden Sie sich in einem Labyrinth aus automatisch generierten Funktionen mit kryptischen Namen wieder. Es ist auch nicht sofort klar, wie Sie hier Änderungen verfolgen können. Soll man das Generat unter Source Control stellen oder den Input? Ist der Input überhaupt sinnvoll trackbar?

##### Closed-Source-Tools

Am besorgniserregendsten sind vielleicht die Tools, deren Innenleben völlig intransparent ist. Closed-Source-Compiler, Debugger und Analyse-Tools erfüllen ihre Funktionen sicher meist angemessen, aber wenn mal etwas schief geht, bleibt nichts anderes übrig, als ein Support-Ticket einzureichen und zu warten. Du kannst keinen Blick in den Quellcode werfen, um zu verstehen, warum sich Dein Code im Release-Modus anders verhält als im Debug-Modus. Ihr könnt einen Fehler, der die Veröffentlichung Eures Produkts blockiert, nicht beheben. Ihr seid vollständig von den Prioritäten und Zeitplänen des Anbieters abhängig. 

#### Die Probleme, die entstehen

Diese Tool-Entscheidungen, werden euch zu Beginn harmlos oder sogar vorteilhaft erscheinen, schaffen aber schnell ein Netz aus Problemen, die sich oft im weiteren Projektverlauf manifestieren.

##### Die Bindung an einen Anbieter schafft eine Geiselsituation

Sobald Ihr stark von proprietären Tools abhängig seid, verliert Ihr Eure Verhandlungsmacht. Ihr habt eurem Lieferanten den Wettbewerbsdruck genommen und damit hält ihn natürlich nichts mehr davon ab die Lizenzgebühren anzuheben. Funktionen können ohne Vorwarnung entfernt oder als veraltet markiert werden. Die Roadmap des Anbieters bekommt Vorrang vor Euren Bedürfnissen. Ihr seid kein Kunde mehr, sondern eine Geisel, die all Forderungen akzeptieren muss, weil die Kosten für eine Flucht zu hoch geworden sind.

##### Innovation wird mühsam oder unmöglich

Wenn die verwendeten Werkzeuge Eure Architektur diktieren, wird die Einführung neuer Technologien oder Methoden außerordentlich schwierig. Möchtet Ihr Continuous Integration integrieren? Nun, Euer proprietäres Build-System unterstützt keine Befehlszeilen-Builds. Seid Ihr an statischer Analyse interessiert? Geht nicht weil Eure Toolchain Euch nicht lässt. Erwägt Ihr den Umstieg auf einen leistungsstärkeren Prozessor? Euer gesamter Entwicklungs-Workflow ist plötzlich inkompatibel. Die Tools, die Euch eigentlich dabei helfen sollten, bessere Produkte zu entwickeln, hindern Euch nun genau daran.

##### Die Lernkurve lässt sich nicht übertragen

Jedes proprietäre Tool erfordert eigenes Fachwissen. Wenn ein neuer Entwickler zu Eurem Team stößt, muss er nicht nur Euer Produkt, sondern auch die Besonderheiten der IDE, des Build-Systems und der Debugging-Tools Eures spezifischen Anbieters. Dieses Wissen ist nicht übertragbar. Ein Ingenieur, der Jahre damit verbracht hat, das Ökosystem eines Anbieters zu beherrschen, kann dieses Fachwissen nicht direkt anwenden, wenn er zu einem Projekt wechselt, das andere Tools verwendet. Die gesamte Branche leidet unter dieser Fragmentierung, da wertvolle Entwicklungszeit für das Erlernen von Tool-Besonderheiten statt für Entwicklungsprinzipien aufgewendet wird.

##### End-Of-Life Risiken sind real

Unternehmen werden übernommen. Produktlinien werden eingestellt. Supportverträge laufen ohne Verlängerungsoptionen aus. Wenn Ihr Closed-Source-Tool das Ende seiner Lebensdauer erreicht, stehen Sie vor einer unangenehmen Entscheidung: Sie müssen entweder Ihren Entwicklungssetup für immer einfrieren und versuchen, alte Prozesse so lange wie möglich am Laufen zu halten, oder eine Notmigration auf eine andere Toolchain durchführen, während Eure Wettbewerber weiterhin Produkte ausliefern. Dies ist kein theoretisches Problem. Ingenieure, die schon lange in der Branche tätig sind, haben genau dieses Szenario schon oft erlebt.

##### Integration ist keine Priorität

Proprietäre Tools sind nicht dafür ausgelegt, mit anderen zusammenzuarbeiten. Die Integrationsmöglichkeiten, sofern überhaupt vorhanden, sind in der Regel begrenzt, schlecht dokumentiert und können ohne Vorankündigung geändert werden. Der Anbieter hat kein wirtschaftliches Interesse daran, Euch dabei zu helfen, sein Tool als Teil eines größeren Workflows zu nutzen. Er möchte vielmehr, dass Ihr für alles sein komplettes Ökosystem verwenden.

#### Ein besserer Weg in die Zukunft

Der Weg aus dieser Geiselsituation erfordert eine bewusste Auswahl der Tools und die Bereitschaft, in nachhaltigere Ansätze zu investieren.

##### Ersetzt proprietäre Tools durch Industriestandards

Verwendet nach Möglichkeit freie und quelloffene Software (FLOSS), die weit verbreitete Standards implementiert. CMake beispielsweise hat sich zum De-facto-Standard für die Build-Konfiguration von C und C++ in der gesamten Branche entwickelt. Es wird von praktisch allen IDE- und CI-Systemen unterstützt. Ein Entwickler, der CMake in einem Projekt lernt, kann dieses Wissen sofort im nächsten Projekt anwenden. 

Das gleiche Prinzip gilt für die gesamte Toolchain. GCC und Clang bieten Compiler für die meisten Architekturen. GDB und LLDB bieten leistungsstarkes Debugging mit umfangreicher Dokumentation und Community-Support. Git bietet eine Versionskontrolle, die jeder Entwickler bereits kennt. Diese Tools verfügen über große Communities, langfristigen Support und das ohne Lizenzgebühren.

##### Führe Abhängigkeiten bewusst und sparsam ein

Jedes Framework und jede Bibliothek, die Du einsetzt, ist eine langfristige Verpflichtung. Bevor Ihr eine Abhängigkeit einführt, fragt: Was wäre erforderlich, um XY wieder zu entfernen, wenn es nötig wäre? Wenn die Antwort „eine komplette Neuprogrammierung unserer Anwendung” lautet, solltet Ihr es euch vielleicht noch einmal überlegen.

Das bedeutet nicht, dass man immer alle Frameworks und Bibliotheken vermeiden sollte. Es bedeutet, dass Ihr Euch gut überlegen solltet, wo Ihr welche einsetzt und wie tief Ihr sie integriert. Nutzt Frameworks für das, was sie gut können, aber zieht klare Grenzen zwischen dem Framework-Code und Ihrer Anwendungslogik ein. Bevorzugt Sie Bibliotheken, die spezifische Probleme lösen, gegenüber monolithischen Frameworks, die Eure gesamte Codebasis übernehmen wollt.

Wenn Ihr ein Framework oder Tool einsetzt, macht Euch mit dessen Lizenz- und Governance-Modell vertraut. Wer kontrolliert dessen Ausrichtung? Was passiert, wenn die Maintainer das Interesse verlieren oder das dahinterstehende Unternehmen seine Strategie ändert? Könnt Ihr es bei Bedarf forken?

#### Die Vorteile der Freiheit

Bei der Wahl offener, standardbasierter Tools geht es nicht nur darum, Probleme zu vermeiden. Sie schaffen echte Vorteile für Euer Engineering.

##### Schnellere Einarbeitung und übertragbares Wissen

Wenn Eure Tools dem Industriestandard entsprechen, können neue Teammitglieder schneller produktiv arbeiten. Sie kennen sich bereits mit CMake aus. Sie kennen sich bereits mit Git aus. Sie wissen, wie man einen Standard-Debugger verwendet. Eure Schulungsaufwendungen könne sich auf Euer Produkt konzentrieren, anstatt auf die Eigenheiten proprietärer Tools. Und das Fachwissen, das Eure Teams erwerben, wird ihnen während ihrer gesamten Karriere zugutekommen und Euer Unternehmen zu einem attraktiven Arbeitsplatz für talentierte Ingenieure machen.

##### Denke wie ein Ingenieur, nicht wie ein Verbraucher

Proprietäre Tools fördern eine Verbrauchermentalität. Ihr verwendet das, was der Anbieter bereitstellt, so wie es der Anbieter vorgesehen hat. Ihr wartet darauf, dass er die von Ihnen benötigten Funktionen hinzufügt. Ihr arbeitet mit den Einschränkungen, die er Euch auferlegt.

Offene Tools fördern eine Ingenieursmentalität. Du verstehst, wie Deine Werkzeuge funktionieren. Du kannst sie bei Bedarf modifizieren. Ihr habt die Kontrolle über den Entwicklungsprozess, anstatt anders herum. Diese veränderte Perspektive wirkt sich auf die gesamte Herangehensweise Eures Teams an Probleme aus.

##### Geringere Lizenzkosten

Das finanzielle Argument ist klar. FLOSS-Tools nach Industriestandard haben in der Regel keine Lizenzgebühren pro Arbeitsplatz. Ihr könnt neue Entwicklungsmaschinen, Server und CI-Runner einrichten, ohne Lizenzen zählen zu müssen. Euer Tooling-Budget kann für Ingenieure statt für die Kassen der Anbieter verwendet werden.

##### Größere Flexibilität

Wenn Eure Tools offen und standardbasiert sind, wird Eure Produktarchitektur flexibler. Ihr könnt Komponenten leichter austauschen, neue Technologien einführen und auf neue Anforderungen reagieren. Eure technischen Schulden reduzieren sich.

##### Geringeres Risiko einer Einstellung

Open-Source-Tools mit aktiven Communities verschwinden nicht plötzlich, wenn ein Unternehmen eine strategische Neuausrichtung vornimmt. Selbst wenn die ursprünglichen Betreuer weiterziehen, bleibt der Code verfügbar. Es können Forks entstehen. Die Community kann die Entwicklung fortsetzen. Eure Investitionen in Mitarbeiter-Know-How und Integration sind geschützt.

##### Überlegene Integration

Standardbasierte Tools sind so konzipiert, dass sie zusammenarbeiten. Ihre Schnittstellen sind dokumentiert und stabil. Es gibt ein lebendiges Ökosystem aus unterstützenden Tools und Erweiterungen und Dokumentation. Aus diesen Komponenten lässt sich dann ein Entwicklungsworkflow aufbauen, der genau auf Eure Bedürfnisse zugeschnitten ist. 

#### Der Weg nach vorn

Bei der Umstellung von proprietären auf offene Tools geht es darum, technische Schulden auf kontrollierte Weise und zu Euren Bedingungen abzubauen. Es wird zwangsläufig Migrationskosten, Lernkurven und manchmal auch echte Lücken geben. Für einige Nischenhardware oder spezielle Anforderungen gibt es möglicherweise noch keine ausgereiften Open-Source-Lösungen. Eure Anwendung ist möglicherweise stärker mit einem bestimmten Framework verflochten, als bisher bekannt war. Und so weiter und so fort. All dies sind Mängel, die bereits tief in Euren Prozessen und Eurer Codebase verankert sind und dort als Risiken schlummern, die jederzeit durch externe Faktoren geweckt werden und Ihr Unternehmen gefährden können. Jeder Versuch, sich heute davon zu befreien, trägt dazu bei, diese Risiken zu mindern.

Tools, die deine Arbeit gefangen halten, haben keine Zukunft, einfach weil es einen besseren Weg gibt. Die Welt der Embedded Software erwacht, und die Tools, die überleben werden, sind diejenigen, die sich ihren Platz durch echten Mehrwert und nicht durch Lock-in verdienen.

Der Weg in die Zukunft wird also klar. Die Embedded-Software-Branche wird konvergieren zu offenen, standardbasierten Tools, die in anderen Bereichen der Softwareentwicklung bereits etabliert sind. Teams, die diesen Wandel jetzt begrüßen, werden sich für die Zukunft besser positioniert sehen, mit relevanteren Skills, geringeren Kosten und größerer Innovationsfreiheit.


