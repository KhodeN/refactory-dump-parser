Ресурсы для создания дополнений к игре ReFactory
================================================

Параметры объектов игры
-----------------------

### Иконки

Все иконки лежат по адресу: <https://re-factory.ru/files/mods/icons/>

Если в конфиге, например, указана иконка `IronPlate.png`, то полный
URL: <https://re-factory.ru/files/mods/icons/IronPlate.png>

### Параметры ресурсов

Файл <https://re-factory.ru/files/mods/config_resources.csv>

Столбцы:

* `sid` - id ресурса
* `note` - файл иконки|название ресурса на русском|название ресурса по-английски
* `heat_energy` - выделяемая тепло-энергия (можно использовать как топливо)
* `min_required` - предупреждение игроку, если на базе ресурсов меньше такого количества
* `sort` - сортировка: 0 - не используется в игре, 1.\* - руда, 2.\* - первичная переработка, 3.\* - изготовление
* `recipe1_group` - В каком здании делать (см. таблицу ниже)
* `recipe1_count` - сколько шт. получается (у зданий еще есть модификаторы к количеству)
* `recipe1_duration` - сколько секунд делается (у зданий еще есть модификаторы к скорости)
* `recipe1_sources` - ингредиенты*количество; ...
* `recipe1_research` - если должно открываться только после изучения этой технологии
* `recipe2_*` - альтернативный рецепт по изготовлению такого ресурса.

### Фабрики

  ID | Пояснение
  --- | ---
  `MiningUnderground` | бур
  `MiningRock` | копатель
  `MiningWater` | помпа
  `MiningOil` | нефтевышка
  `Smelter` | плавильня на 1 ресурс
  `Foundry` | плавильня на 2 ресурса
  `Constructor` | сборщик на 1 ресурс
  `Assembler` | сборщик на 2 ресурса
  `Chem` | хим.лаба на 1 ресурс
  `Laboratory` | хим.лаба на 2 ресурса
  `Sawmill` | лесопилка
  `Barracks` | бараки для создания боевых дроидов
  `Miller` | дробилка

Если название группы начинается с восклицательного знака, значит этот ресурс еще не доделан и в зданиях не производится,
только запланировано.

### Параметры исследований

Файл <https://re-factory.ru/files/mods/config_research.csv>

Столбцы:

* `sid` - id исследования
* `note` - файл иконки|название ресурса на русском|название ресурса по-английски
* `tab` - На какой вкладке располагается:
* `logistics` - развязки, транспортировка
* `production` - производство
* `war` - военные технологии
* `enemy` - исследование планеты
* `unavailable` - где помечено, это исследование еще не готово и в игру не добавлено
* `need_research` - требуется чтобы была открыта эта технология
* `ingredients` - какие ресы лаба должна переработать для открытия этой технологии
* `duration` - сколько секунд "исследуется," когда собраны все ингредиенты
* `effect` - особый эффект от исследования,
* `percent` - сколько процентов дает эффект
* `position` - положение в окне исследований

### Параметры объектов

Файл <https://re-factory.ru/files/mods/config_entities.csv>

Столбцы:

* `Sid` - id объекта
* `Note` - файл иконки|название ресурса на русском|название ресурса по-английски
* `Sort` - для сортировки в магазине. То, что меньше или равно нулю - игрок не может строить
* `Research` - требуется чтобы была открыта эта технология
* `Ingredients` - ресурсы для постройки
* `StorageMaxCount` - объем хранилища
* `ResearchSampler` - какие образцы исследований можно отсюда взять
* `ElectricityConsumption` - сколько потребляет электроэнергии
* `ElectricityPower` - сколько электроэнергии вырабатывает
* `ResourceCount` - у источников ресурсов: сколько ресурсов на каждом уровне
* `DroneReceiptId` - каких дронов можно создавать в здании
* `MiningResourceCount` - множитель к количеству добываемых ресурсов за один цикл
* `ConnectRadius` - для электростолбов: в какой зоне вокруг себя подключаем здания
