import { TYear } from '../../types'
import truck from './images/truck.jpg'
import dogs from './images/dogs.jpg'
import leningrad from './images/leningrad.jpg'
import roadOfLife from './images/road-of-life.jpg'
import church from './images/church.jpg'
import stalin from './images/stalin.jpg'
import pow from './images/pow.jpg'
import sovietSoldiers from './images/soviet-soldiers.jpg'
import oldman from './images/oldman.jpg'
import attack from './images/attack.jpg'
import levitan from './images/levitan.jpg'
import victoryDay from './images/victory-day.jpg'
import redSquare from './images/red-square.jpg'
import victoryBanner from './images/victory-banner.jpg'

type TIllustrationInfo = {
  image?: string
  imageAlt?: string
  text: string
  position: number
}

type TLetterContents = Record<
  TYear,
  {
    fact: string[]
    author: string[]
    date: string
    mainText: string[]
    illustrationsLeft: TIllustrationInfo[]
    illustrationsRight: TIllustrationInfo[]
  }
>

export const letterContents: TLetterContents = {
  1941: {
    fact: [
      'В 1941 году были введены медальоны в виде пенала, где служащие хранили вкладыши с идентифицирующими их данными (фамилия, имя и т.д.). В случае смерти один вкладыш отправлялся в соответствующую службу, а второй семье. Медальон часто называют смертным.',
      'Солдаты нередко считали ношение смертного медальона дурной приметой и либо сами выбрасывали его, либо использовали не по назначению: приспосабливали пенал для хранения иголок и других мелких бытовых предметов, переделывали в мундштук.',
    ],
    date: 'June 28',
    author: ['А. Голиков', 'Письмо танкиста-героя жене'],
    mainText: [
      '_ Милая Тонечка!',
      'Я не знаю, прочитаешь ли ты когда-нибудь эти строки? Но я твердо знаю, что это последнее мое письмо.',
      'Сейчас идет бой жаркий, смертельный. Наш танк подбит. Кругом нас фашисты. Весь день отбиваем атаку. Улица Островского усеяна трупами в зелёных мундирах, они похожи на больших недвижимых ящериц. Сегодня шестой день войны. Мы остались вдвоём - Павел Абрамов и я. Ты его знаешь, я тебе писал о нём. Мы не думаем о спасении своей жизни. Мы воины и не боимся умереть за Родину. Мы думаем, как бы подороже немцы заплатили за нас, за нашу жизнь...',
      '- Каждое письмо строго проверялось цензурой. Любая секретная информация, в том числе местоположение служащего, закрашивалась цензором.',
      '# Нахожусь по адресу, который нельзя разглашать, но напишу.\nЯ сижу в изрешеченном и изуродованном танке. Жара невыносимая, хочется пить. Воды нет ни капельки. Твой портрет лежит у меня на коленях. Я смотрю на него, на твои голубые глаза, и мне становится легче - ты со мной. Мне хочется с тобой говорить, много-много, откровенно, как раньше, там, в Иваново... 22 июня, когда объявили войну, я подумал о тебе, думал, когда теперь вернусь, когда увижу тебя и прижму твою милую головку к своей груди? А может, никогда. Ведь война... Когда наш танк впервые встретился с врагом, я бил по нему из орудия, косил пулеметным огнем, чтобы больше уничтожить фашистов и приблизить конец войны, чтобы скорее увидеть тебя, мою дорогую. Но мои мечты не сбылись... Танк содрогается от вражеских ударов, но мы пока живы.',
      'Снарядов нет, патроны на исходе. Павел бьет по врагу прицельным огнем, а я «отдыхаю», с тобой разговариваю. Знаю, что это в последний раз. И мне хочется говорить долго, долго, но некогда. Ты помнишь, как мы прощались, когда меня провожала на вокзал? Ты тогда сомневалась в моих словах, что я вечно буду тебя любить.',
      '_ Предложила расписаться, чтобы я всю жизнь принадлежал тебе одной. Я охотно выполнил твою просьбу. У тебя на паспорте, а у меня на квитанции стоит штамп, что мы муж и жена. Это хорошо. Хорошо умирать, когда знаешь, что там, далеко, есть близкий тебе человек, он помнит обо мне, думает, любит. «Хорошо любимым быть...» Сквозь пробоины танка я вижу улицу, зеленые деревья, цветы в саду яркие-яркие. У вас, оставшихся в живых, после войны жизнь будет такая же яркая, красочная, как эти цветы, и счастливая... За нее умереть не страшно... Ты не плачь. На могилу мою ты, наверное, не придешь, да и будет ли она - могила-то?',
    ],
    illustrationsLeft: [
      {
        image: dogs,
        imageAlt: 'Собаки на войне',
        text:
          'На разных фронтах службу прошли более 60 тысяч собак. Собаки-связисты добыли для СССР около двухсот донесений. На повозках скорой помощи собак увезли с поля боя не менее 700 тысяч раненых солдат и офицеров Красной Армии. Благодаря собакам-саперам расчищено 303 населенных пункта.',
        position: 73,
      },
    ],
    illustrationsRight: [
      {
        image: truck,
        imageAlt: 'Трактор-танк',
        text:
          'Из-за острой нехватки танков вооруженные силы СССР изготавливали их из простых тягачей. В ходе Одесской оборонительной операции в бой было брошено 20 тракторов, покрытых листами брони. Естественно, что основной эффект от такого решения психологический. Напав ночью на румын с включенными сиренами и фонарями, русские заставили их бежать. Что касается вооружения, то многие из этих «танков» были оснащены макетами тяжелых орудий.',
        position: 47,
      },
      {
        text:
          '22 июня 1941 года советский летчик И. Иванов решился на воздушный таран. Это был первый военный подвиг, отмеченный званием Героя Советского Союза.',
        position: 99,
      },
    ],
  },

  1942: {
    fact: [
      'Из-за дефицита продуктов еду давали по карточкам. Самими известными являются хлебные карточки блокадного Ленинграда. По ним каждый день давалась определенная норма хлеба, так самое минимальное значение составляло всего лишь 125 граммов иждевенцам и 250 граммов рабочим. При этом калорийность хлеба не могла восполнить затрат человеческого организма даже на простое существование.',
    ],
    date: 'January 13',
    author: ['В. Мантул', 'Из дневника ленинградского юноши'],
    mainText: [
      'В отношении питания совсем плохо в городе. Вот уже месяц, как большинство населения не видит круп и жиров. Это очень сказывается на психике людей. Всюду, куда ни приглянешься, безумные взгляды на провизию...',
      'Сам же город приобрел какую-то неестественную пустынность, омертвелость. Пойдешь по улице и видишь картину: идет народ. Поклажа исключительно либо вязанка дров, либо кастрюлечка с бурдой из столовой. Трамваи не ходят, машин мало... Дым идет только из форточек жилых кеартир, куда выведены трубы «буржуек», да и то не из всех. У многих нет даже возможности топить времянку за неимением дров.',
      'Очень большая смертность. Да и я сам не знаю, удастся ли пережить нашей семье эту зиму... Хотя бы мать моя выдержала все эти лишения и дожила до более легких дней. Бедняга, тоже старается, выбиваясь из последних сил. Ну, а много ли их у 46-летней женщины?... Ведь она одна, фактически, нас и спасает сейчас. То пропуск в столовую, то от себя урвет лишнюю порцию от обеда, чтобы прислать ее нам, то хлеба кусочек. А сама живет в холоде и голоде, имея рабочую карточку, питается хуже служащего.',
      '- Во время блокады города, тысячи людей вели дневники. Как могли, они старались отразить в них все ужасы того времени. Ленинград оставался в осаде 872 дня.',
      'Неужели это все-таки долго протянется? Впереди еще два месяца холодов и голода. Позади 4-месячная блокада и голод. Это поистине нужно быть железным... Очень хотелось бы дождаться теплой поры, когда не надо было бы дорожить каждым горючим предметом для печи, и уехать куда-нибудь в колхоз, помогать там создавать урожай для будущего года и создать бы, по крайней мере, такие запасы, чтобы обеспечить хотя бы нормальное снабжение приличным черным хлебом для всех жителей...',
      'Ну, ладно. Надо, как видно, сейчас идти по воду. Вода замерзла абсолютно везде, и нести ее придется за 4 километра из колодца. В квартире не осталось даже капли воды, чтобы согреть чай. Чай! Как громко звучит это слово сейчас, когда рад и кипятку с хлебом! Пить же чай абсолютно не с чем. Нет ни одной крошки сладкого, и пить кипяток надо с солью. Единственное, чего у нас хватает, - это соли. Хотя в магазинах и ее нет, но у нас был небольшой запас - кг. около 2-3, и вот он пока тянется. Теперь хотелось бы написать письмо маме, как раз моя тетя идет к ней, но не знаю, стоит ли передавать его с ней. Она может его прочесть, а это весьма нежелательно. Ну, что же, надо идти за водой... Мороз меня прямо страшит. Если дойду, то это будет великое счастье...',
    ],
    illustrationsLeft: [
      {
        image: leningrad,
        imageAlt: 'Блокада Ленинграда',
        text:
          'Всего за время блокады от голода и лишений погибло свыше 630 тысяч ленинградцев.  Эта цифра, озвученная советским обвинителем на Нюрнбергском процессе, сегодня оспаривается рядом историков, полагающих, что общее число жертв блокады могло достигнуть 1,5 млн человек.',
        position: 12,
      },
      {
        image: church,
        imageAlt: 'Пасха 1942',
        text:
          'Весной 1942 года в Ленинграде праздновали Пасху в 10 храмах, а фашисты решили проверить нервы советских людей жестокой бомбардировкой. Но службы в храмах шли, как положено, люди не паниковали и ни один храм не пострадал.',
        position: 67,
      },
    ],
    illustrationsRight: [
      {
        image: roadOfLife,
        imageAlt: 'Дорога Жизни',
        text:
          'Магистралью, спасшей Ленинград от гибели, стала проложенная через Ладожское озеро «Дорога жизни». Этот маршрут снабжения действовал в период с 12 сентября 1941 года по март 1943 года. В летнее время «Дорога жизни» действовала как водный маршрут, в зимнее – как ледовая автодорога.',
        position: 32,
      },
      {
        text:
          'На территории Советского Союза были разрушены более 1700 городов и 70 тысяч сел и деревень. Полностью или частично уничтожены 1,5 миллиона зданий. На оккупированных территориях немецкие войска уничтожили почти половину жилого фонда.',
        position: 97,
      },
    ],
  },

  1943: {
    fact: [
      'В качестве талисмана служащие часто брали с собой на фронт ключ от дома. Они верили, что это поможет им вернуться с войны живыми.',
    ],
    date: 'March 12',
    author: [
      'Катя Сусанина',
      'Письмо 15-летней девочки',
      'с фашистской каторги',
    ],
    mainText: [
      '_ Дорогой, добрый папенька!',
      'Пишу я тебе письмо из немецкой неволи. Когда ты, папенька, будешь читать это письмо, меня в живых не будет. И моя просьба к тебе, отец: покарай немецких кровопийц. Это завещание твоей умирающей дочери.',
      'Несколько слов о матери. Когда вернешься, маму не ищи. Ее расстреляли немцы. Когда допытывались о тебе, офицер бил ее плеткой по лицу. Мама не стерпела и гордо сказала, вот ее последние слова: «Вы, не запугаете меня битьем. Я уверена, что муж вернется назад и вышвырнет вас, подлых захватчиков, отсюда вон». И офицер выстрелил маме в рот...',
      'Папенька, мне сегодня исполнилось 15 лет, и если бы сейчас ты встретил меня, то не узнал бы свою дочь. Я стала очень худенькая, мои глаза ввалились, косички мне остригли наголо, руки высохли, похожи на грабли. Когда я кашляю, изо рта идет кровь - у меня отбили легкие. А помнишь, папа, два года тому назад, когда мне исполнилось 13 лет? Какие хорошие были мои именины! Ты мне, папа, тогда сказал: «Расти, доченька, на радость большой!» Играл патефон, подруги поздравляли меня с днем рождения, и мы пели нашу любимую пионерскую песню. А теперь, папа, как взгляну на себя в зеркало - платье рваное, в лоскутках, номер на шее, как у преступницы, сама худая, как скелет,- и соленые слезы текут из глаз. Что толку, что мне исполнилось 15 лет. Я никому не нужна. Здесь многие люди никому не нужны. Бродят голодные, затравленные овчарками. Каждый день их уводят и убивают.',
      '- Сотни тысяч советских граждан, мужчин и женщин, уводятся гитлеровцами на принудительные работы. Рабским трудом они пытаются ликвидировать острый недостаток рабочей силы в промышленности и сельском хозяйстве.',
      'Да, папа, и я рабыня немецкого барона, работаю у немца Шарлэна прачкой, стираю белье, мою полы. Работаю очень много, а кушаю два раза в день в корыте с «Розой» и «Кларой» - так зовут хозяйских свиней. Так приказал барон. «Русс была и будет свинья»,- сказал он. Я очень боюсь «Клары». Это большая и жадная свинья. Она мне один раз чуть не откусила палец, когда я из корыта доставала картошку. Живу я в дровяном сарае: в комнату мне входить нельзя. Один раз горничная полька Юзефа дала мне кусочек хлеба, а хозяйка увидела и долго била Юзефу плеткой по голове и спине. Два раза я убегала от хозяев, но меня находил ихний дворник. Тогда сам барон срывал с меня платье и бил ногами. Я теряла сознание. Потом на меня выливали ведро воды и бросали в подвал.',
      '_ Сегодня я узнала новость: Юзефа сказала, что господа уезжают в Германию с большой партией невольников и невольниц с Витебщины. Теперь они берут и меня с собою. Нет, я не поеду в эту трижды всеми проклятую Германию! Я решила лучше умереть на родной сторонушке, чем быть втоптанной в проклятую немецкую землю. Только смерть спасет меня от жестокого битья. Не хочу больше мучиться рабыней у проклятых, жестоких немцев, не давших мне жить!.. Завещаю, папа: отомсти за маму и за меня. Прощай, добрый папенька, ухожу умирать.',
      '_ Твоя дочь Катя Сусанина. В душе я спокойна а сердцем уверена. Любимый Сталин вышвырнет немецких убийц с родной земли.',
      '_ Мое сердце верит: письмо дойдет',
    ],
    illustrationsLeft: [
      {
        image: stalin,
        imageAlt: 'Иосиф Виссарионович Сталин',
        text:
          'На войне сын Сталина Яков Джугашвили попал в плен. Фашисты предложили Сталину обменять его сына на фельдмаршала Паулюса, который находился в плену у советских войск. Сталин отказался, сказав, что солдата не меняют на фельдмаршала. Незадолго до прихода Советской армии Яков был расстрелян. После войны его семья была сослана в качестве военнопленных. Когда Сталина об этом уведомили, он заявил, что не будет делать исключений для родственников и не переступит закон.',
        position: 12,
      },
      {
        text:
          'Нацисты вывезли тысячи детей «нордической внешности» из Польши и Советского Союза. Они забрали детей в возрасте от двух месяцев до шести лет и отвезли их в концентрационный лагерь под названием Kinder KC, где была определена «расовая ценность» детей. Отобранные дети подвергались «первоначальной германизации». Их называли немецкими именами и учили немецкому языку. Новое гражданство ребенка было подтверждено поддельными документами. Германизированные дети были отправлены в местные приюты.',
        position: 62,
      },
      {
        text:
          'Английским солдатам выдавали молотки, они стучали ими по броне вражеских танков. Услышав стук, немецкие танкисты открывали люк, чтобы проверить кто там и получали внутрь гранату.',
        position: 102,
      },
    ],
    illustrationsRight: [
      {
        image: pow,
        imageAlt: 'Пленные солдаты',
        text:
          'В плен к немцам попали около 5,27 миллиона советских солдат, которые содержались в ужасных условиях. Этот факт подтверждается тем, что на родину вернулось менее двух миллионов красноармейцев.',
        position: 25,
      },
      {
        image: sovietSoldiers,
        imageAlt: 'Советские солдаты',
        text:
          'Советский Союз относился к военнопленным противника гораздо гуманнее, о чем свидетельствует тот факт, что в Великой Отечественной войне погибло 350 тысяч немецких пленных, а оставшиеся 2 миллиона благополучно вернулись домой.',
        position: 78,
      },
    ],
  },

  1944: {
    fact: [
      'В тяжелых условия фронта просто не было возможности искать конверт и марки, поэтому придумали более «мобильную» версию почтовых отправлений. С бумагой были проблемы, поэтому в ход могло пойти что угодно: тетрадный листок, кусок оберточной бумаги или даже пачка от папирос.',
      'Написав послание, листок складывали треугольником и на одной стороне писали свои данные и адрес получателя.',
    ],
    date: 'January 4',
    author: ['Гавриил Масловский', 'Завещание сыну'],
    mainText: [
      'Ну вот, мой милый сын, мы больше не увидимся. Час назад я получил задание, выполняя которое живым не вернусь. Этого ты, мой малыш, не пугайся и не унывай. Гордись такой гордостью, с какой идет твой папа на смерть: не каждому доверено умирать за Родину. Приму все меры, чтобы это письмо переслали тебе, а ты с ним будь осторожнее, не пугай свою бабусю.',
      'Славному городу Ленина - колыбели революции грозит опасность. От выполнения моего задания зависит его дальнейшее благополучие. Ради этого великого благополучия буду выполнять задание до последнего вздоха, до последней капли крови. Отказаться от такого задания я не собирался, наоборот, горю желанием, как бы скорее приступить к выполнению.',
      'В ожидании машины роюсь в неугомонных мыслях, с молниеносной скоростью задаю сам себе вопросы и тут же даю ответ. Одним из первых вопросов будет такой: Какие силы помогают мне совершить мужественный поступок? Воинская дисциплина и партийный долг. Правильно говорят: от дисциплины до геройства - один шаг. Это, сын, запомни раз и навсегда. А пока есть время, надо отвинтить от кителя ордена, поцеловать их по своей гвардейской привычке.  Рассказываю тебе обо всем подробно, хочу, чтобы ты знал, кто был твой отец, как и за что отдал жизнь. Вырастешь большим - осмыслишь, будешь дорожить Родиной. Хорошо, очень хорошо дорожить Родиной.',
      '- Девиз «Все для фронта, все для победы!» стал основным смыслом жизни всех советских граждан. Что бы ни делали фашисты, они не смогли сломить силу духа советского народа.',
      'У меня есть сын. Жизнь моя - продолжается, вот почему мне легко умереть. Я знаю, что там, в глубоком тылу, живет и растет наследник моего духа, сердца, чувства. Я умираю и вижу свое продолжение. Сын, ты в каждом письме просил и ждал моего возвращения домой с фронта. Без обмана: его больше не жди и не огорчайся, ты не один. При жизни нам, сынка, мало пришлось жить вместе, но я на расстоянии любил тебя и жил только тобой. Вот и сейчас думается, хоть я буду мертвый, но сердце продолжает жить тобой, даже смерть не вытеснит тебя из моего скупого сердца.',
      '_ В своем прощальном письме прошу командование определить сына воспитанником Суворовского военного училища, желательно в Ленинградскую область - это для того, чтобы он мог посетить Поддорский район, Сокольский сельсовет, потому что возле деревни Хлебоедово закончит жизненный путь его отец. Когда начнется мирная жизнь, возродятся колхозы, сын будет шефом колхоза деревни Хлебоедово. Прощай, мой сын, прощай, дорогая жена!',
      '_ Поля, Юра! Жена, сын! Радость вы моя, кровь моя, жизнь моя! Люблю, люблю до последней капли крови!',
      '_ Выполняйте мое завещание. Целую, искренне любящий Гавриил.',
    ],
    illustrationsLeft: [
      {
        image: attack,
        imageAlt: 'Атака',
        text:
          'Официальные данные о потерях советских войск в Курской битве были опубликованы только в 1993 году. По данным исследователя Б. В. Соколова, потери немцев в Курске составили около 360 тысяч убитых, раненых и пленных солдат. Советские потери были в семь раз выше, чем у нацистов.',
        position: 20,
      },
      {
        image: levitan,
        imageAlt: 'Юрий Левитан',
        text:
          'Своим главным врагом в СССР лидер нацистов считал не Сталина, а Юрия Левитана. За голову диктора Гитлер предложил 250 тысяч марок. В связи с этим советские власти самым тщательным образом охраняли Левитана, дезинформируя прессу о его внешности.',
        position: 72,
      },
    ],
    illustrationsRight: [
      {
        image: oldman,
        imageAlt: 'Русский крестьянин',
        text:
          '83-летний крестьянин Матвей Кузьмин повторил подвиг Ивана Сусанина, который в 1613 году привел поляков в непроходимое болото.',
        position: 12,
      },
      {
        text:
          '7 июля 1943 года,в разгар Курской битвы, пулеметчик 1019-го полка Яков Студенников воевал самостоятельно в течение двух дней. Остальные солдаты из его расчета были убиты. Несмотря на ранения, Студенников отбил 10 вражеских атак и убил более трехсот гитлеровцев. За этот подвиг ему было присвоено звание Героя Советского Союза.',
        position: 35,
      },
      {
        text:
          'Солдаты высовывали из окопов каски, надетые на винтовки или палки, чтобы проверить, там ли враг. Со стороны противника было похоже, будто это голова солдата.',
        position: 120,
      },
    ],
  },

  1945: {
    fact: [
      'Русские солдаты часто брали в качестве трофея шоколад немецкой торговой марки Scho-Ka-Kola. Он  входил в рацион немецких летчиков и назывался «Fliegerschokolade». Обладает бодрящим эффектом за счет содержания кофеина и ореха колы.',
    ],
    date: 'May 9',
    author: ['Маркел Ситников', 'Письмо с Днём Победы'],
    mainText: [
      '_ С ДНЕМ ПОБЕДЫ!',
      '_ Маркел',
      '...разрушены, но не сильно. Но остальной Берлин разрушен исключительно. Немцы хотели разрушить Москву и Лондон, они получили превращенный в груду камней Берлин. Видел дома-резиденции Гитлера, Геббельса, тоже разрушенные и сгоревшие. Немцы вывешивают белые флаги, белые повязки на руку и повторяют одно и то же: «Ales kaput» (т.е. «всему конец»). Теперь они тоже поняли, что такое война и для чего она нужна. Колонны пленных фрицев в километр-полтора можно часто встретить на дорогах под конвоем 5–6 наших бойцов. Из лесов и сейчас все еще выходят фрицы без оружия, надевают белую повязку и идут сдаваться. Гражданское население теперь не с таким уже страхом, как в первые дни в Германии, но все равно исподлобья встречают нас. Зато с огромной радостью относятся военнопленные и мирные жители, завезенные из других стран, и теперь освобожденные Красной Армией.',
      'Колонны их на повозках со скарбом движутся в разных направлениях. У каждой повозки, тележки вывешен флаг твоей страны, какой национальности сам хозяин. А флагов так много, что иногда и не знаешь какой страны, не то Греции или это Норвегия или Дания и т.п.',
      '- Красноармейцы завладели Берлином за неделю до девятого мая, ещё 2-го числа, но очаги сопротивления немецких войск сохранялись до 9-го числа, пока Германия официально не подписала капитуляцию.',
      '_ Был на автострадах Германии, где может в ряд идти 8 автомашин. Таких дорог в России я не видел. На 4-й день заночевали в небольшом немецком селе, а утром прибегает боец из комендатуры и сообщает, что война окончилась. Все повскакивали, хотя и было 5 ч. утра, все вне себя от радости, а утро такое солнечное, ясное, как будто только для этого дня. И пока ехали до части, везде на дорогах, в городах и повсюду говорят, что война окончилась, а толком еще ничего никто не знает. И только на 9 мая услышали по радио, что война действительно окончилась.',
      '_ И вот сегодня у нас большой праздник!',
      '_ Ситников Маркел Спиридонович',
    ],
    illustrationsLeft: [
      {
        image: redSquare,
        imageAlt: 'Красная площадь',
        text:
          'В первый месяц войны Московский Кремль был замаскирован: звезды башен и кресты соборов были покрыты покрывалами, а купола выкрашены в черный цвет. Кроме того, по периметру Кремлевской стены были построены трехмерные модели жилых зданий, за которыми не были видны даже зубцы. Так его было невозможно распознать с неба.',
        position: 40,
      },
    ],
    illustrationsRight: [
      {
        image: victoryDay,
        imageAlt: 'Празднование победы',
        text:
          'Не все знают о том, что после войны в Советском Союзе не отмечали праздник “День победы” семнадцать лет.',
        position: 24,
      },
      {
        image: victoryBanner,
        imageAlt: 'Знамя Победы',
        text:
          'Подлинное Знамя Победы хранится в Центральном музее Вооруженных сил как священная реликвия и одно из самых ярких воспоминаний о войне . Флаг сделан из хрупкого сатинировки, его можно хранить только горизонтально. Истинное знамя показывается в особых случаях и в присутствии охраны. Иначе оно заменяется дубликатом, который на 100% идентичен оригиналу и даже стареет таким же образом.',
        position: 84,
      },
    ],
  },
}
