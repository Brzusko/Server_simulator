# Server simulator

**Krótki opis projektu**:

Jest to aplikacja napisana w środowisku Node.js. Symuluje ona serwer gry w celu sprawdzenia funkcjonalności Master Serwera. Jeśli chodzi o komunikacje z master serwerem to jest używany protokół HTTP z bilbioteki request-promise.

Aplikacja używa podprocesów dla każdej instancji serwera gry.

Jej zadaniem jest:
- Rejestrowanie serwera
- Wysyłanie co X czasu informacji takich jak: ilość obecnych graczy, nazwa serwera, detaliczne informacje dotyczące graczy(Nazwa gracza, ilość pkt, klasa postaci itd.).

**Użyte moduły/biblioteki**:
- child_process od Node.js'a
- request-promise
