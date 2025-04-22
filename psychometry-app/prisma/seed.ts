import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const verbalQuestions = [
  {
    content: 'אפיסטמולוגיה : ידיעה',
    options: JSON.stringify(['אונטולוגיה : ישות', 'אתיקה : מוסר', 'אסתטיקה : יופי', 'לוגיקה : טיעון']),
    correctAnswer: 0,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'סינקדוכה : חלק מייצג שלם',
    options: JSON.stringify(['מטונימיה : דימוי מחליף מושג', 'אוקסימורון : צירוף סותר', 'היפרבולה : הגזמה', 'ליטוטס : לשון המעטה']),
    correctAnswer: 0,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'אקסיומה : לא ניתנת להוכחה',
    options: JSON.stringify(['תיאורמה : נובעת מאקסיומות', 'היפותזה : ניתנת לבדיקה', 'פרדוקס : מכיל סתירה', 'דוגמה : אמיתה מוחלטת']),
    correctAnswer: 0,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'להדיר : שינה',
    options: JSON.stringify(['להניא : כוונה', 'להסית : מרד', 'לגרוע : ערך', 'לכלוא : חירות']),
    correctAnswer: 0,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'אינהרנטי : טבוע במהות',
    options: JSON.stringify(['אקראי : חסר סיבה', 'אקסטרינזי : חיצוני', 'אמפירי : מבוסס ניסיון', 'אפריורי : קודם לניסיון']),
    correctAnswer: 1,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'סופיזם : שכנוע מטעה',
    options: JSON.stringify(['רטוריקה : אמנות הנאום', 'דיאלקטיקה : בירור האמת', 'דמגוגיה : ליבוי יצרים', 'אופולוגטיקה : הגנה על אמונה']),
    correctAnswer: 2,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'הניסיון ל________ את מורכבותה של התופעה לכדי מודל ________ ופשטני, ________ בהכרח את רבדיה העמוקים ואת הגורמים הרבים המעצבים אותה.',
    options: JSON.stringify(['לצמצם / ליניארי / מתעלם מ-', 'להרחיב / רב-ממדי / מדגיש את', 'לתאר / הוליסטי / כולל את', 'לנתח / מפורט / מחמיץ את']),
    correctAnswer: 0,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'אף שהיה ידוע ב________ הלוגית הקפדנית שאפיינה את כתביו הפילוסופיים, בשיחותיו הפרטיות הוא נטה לעיתים ל________ וולגרית ואף ל________ שאינם עולים בקנה אחד עם התדמית האקדמית שלו.',
    options: JSON.stringify(['קוהרנטיות / שנינות / הומור דק', 'רשלנות / בוטות / טיעונים מופרכים', 'חדות / התלהמות / גידופים', 'עמימות / התפלספות / אנקדוטות']),
    correctAnswer: 2,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'הטענה כי ניתן ________ לחלוטין את ההשפעות התרבותיות המעצבות את תפיסת המציאות שלנו היא ; למעשה, גם החוקר ה ביותר מגיע למחקרו עם מטען תרבותי ומושגי מסוים.',
    options: JSON.stringify(['לנטרל / יומרנית / אובייקטיבי', 'לכמת / מבוססת / סובייקטיבי', 'לאמץ / ריאלית / ביקורתי', 'להדחיק / פשטנית / מעורב']),
    correctAnswer: 0,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'מה קובע את משמעות המילים לפי ויטגנשטיין המאוחר?',
    options: JSON.stringify(['ההגדרה המילונית המדויקת של כל מילה', 'האובייקט בעולם שהמילה מייצגת באופן ישיר', 'האופן שבו משתמשים במילים בתוך הקשרים חברתיים ופרקטיקות ספציפיות', 'הכוונה האישית של הדובר בעת השימוש במילה']),
    correctAnswer: 2,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'מהי טענתו המרכזית של פייראבנד לגבי השיטה המדעית?',
    options: JSON.stringify(['יש לדבוק בנוקשות בשיטה המדעית המוגדרת כדי להבטיח התקדמות', 'השיטה המדעית היחידה התקפה היא זו המבוססת על תצפית ישירה', 'בפועל, התקדמות מדעית אינה תמיד תוצאה של יישום שיטתי של כללים מוגדרים, ולעיתים דורשת גמישות ואף חריגה מהם', '"אנרכיזם אפיסטמולוגי" מוביל תמיד למבוי סתום במחקר המדעי']),
    correctAnswer: 2,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'מהי המשמעות העיקרית של "מות המחבר" בהקשר זה?',
    options: JSON.stringify(['הסופר אינו חשוב כלל ליצירה הספרותית', 'יש להתמקד בביוגרפיה של הסופר כדי להבין את הטקסט', 'הדגש בפרשנות עובר מכוונת המחבר אל הטקסט עצמו ואל הקורא כיצרן משמעות', 'רק יצירות שכותביהן נפטרו ראויות לניתוח ספרותי']),
    correctAnswer: 2,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'מהו המאפיין המרכזי של מערכות כאוטיות המתואר בפסקה?',
    options: JSON.stringify(['התנהגותן אקראית לחלוטין ואינה ניתנת לשום ניתוח', 'הן אינן רגישות כלל לשינויים בתנאי ההתחלה', 'שינויים קטנים בתחילת התהליך יכולים לגרום להבדלים גדולים מאוד בתוצאה הסופית', 'הן תמיד ליניאריות וקלות לחיזוי']),
    correctAnswer: 2,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'מה ניתן להסיק מהמשפט על יחסו המורכב של ניטשה למסורת היהודית-נוצרית?',
    options: JSON.stringify(['הוא דחה את כולה באופן גורף וחד-משמעי', 'הוא אימץ את הנצרות המאוחרת אך דחה את הברית הישנה', 'הוא מתח ביקורת חריפה על היבטים מרכזיים בה, אך זיהה ערך מסוים בחלקים קדומים יותר שלה', 'הוא ראה ב"מוסר העבדים" את שיא ההתפתחות המוסרית האנושית']),
    correctAnswer: 2,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'מהי "סימולקרה" על פי בודריאר?',
    options: JSON.stringify(['ייצוג נאמן ומדויק של המציאות הממשית', 'המציאות האובייקטיבית כפי שהיא, ללא ייצוגים', 'העתק או דימוי שנתלש מהמקור או שאין לו כלל מקור במציאות, והופך למציאות בפני עצמה', 'תיאוריה מדעית המסבירה את מבנה המציאות']),
    correctAnswer: 2,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'מהי הדרך לאושר ("אאודאימוניה") על פי אריסטו?',
    options: JSON.stringify(['חיים של הנאה חושית מקסימלית', 'השגת עושר וכוח פוליטי', 'חיים רציונליים ופעילים בהתאם למידות טובות המהוות איזון בין קצוות', 'פרישה מהעולם והתמקדות בהתבוננות פילוסופית בלבד']),
    correctAnswer: 2,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'מהי הטענה המרכזית של הביקורת הפמיניסטית על המדע המוצגת בפסקה?',
    options: JSON.stringify(['המדע הוא תחום שבו נשים מצטיינות יותר מגברים', 'האובייקטיביות המדעית המסורתית הייתה לעיתים קרובות מוטה מנקודת מבט גברית, ויש צורך בבחינה ביקורתית ובריבוי נקודות מבט', 'יש לזנוח לחלוטין את השאיפה לאובייקטיביות במדע', 'הביקורת הפמיניסטית מתמקדת רק במדעי החברה ומתעלמת ממדעי הטבע']),
    correctAnswer: 1,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'מהי הבעיה המרכזית שמציגה "בעיית האינדוקציה" של יום?',
    options: JSON.stringify(['הקושי להסיק מסקנות תקפות מן הכלל אל הפרט (דדוקציה)', 'היעדר בסיס לוגי מוצק להנחה שהעתיד ידמה לעבר או שמקרים שטרם נצפו ידמו לאלו שנצפו', 'העובדה שכל הברבורים בעולם אינם לבנים', 'אי-אפשרותה של התצפית האמפירית כמקור לידע']),
    correctAnswer: 1,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'מדוע, לטענת יום, לא ניתן להצדיק את "עקרון אחידות הטבע" באמצעות אינדוקציה?',
    options: JSON.stringify(['כי עקרון זה נוגד את הניסיון האמפירי שלנו', 'כי הצדקה כזו תהיה בגדר הנחת המבוקש (הנחה מראש של מה שרוצים להוכיח)', 'כי ניתן להוכיח את העיקרון באופן דדוקטיבי טהור', 'כי הטבע אינו מתנהג באופן אחיד כלל']),
    correctAnswer: 1,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'כיצד הציע קרל פופר להתמודד עם בעיית האינדוקציה במדע?',
    options: JSON.stringify(['הוא טען שיש למצוא הוכחה לוגית לאינדוקציה', 'הוא הציע שהמדע יתבסס על דדוקציה ועל ניסיונות הפרכה של תיאוריות, במקום על אישושן', 'הוא הראה שהאינדוקציה היא כלי אמין ברוב המקרים', 'הוא קרא לזנוח את השיטה המדעית לחלוטין']),
    correctAnswer: 1,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'מהי המשמעות של היותה של תיאוריה "מאוששת" (Corroborated) לפי פופר?',
    options: JSON.stringify(['התיאוריה הוכחה כאמת מוחלטת וסופית', 'התיאוריה שרדה ניסיונות הפרכה ועל כן נחשבת חזקה יותר, אך לא מוכחת סופית', 'התיאוריה הופרכה באופן ניסויי', 'התיאוריה פשוטה ואלגנטית יותר מתיאוריות מתחרות']),
    correctAnswer: 1,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'מה ניתן להסיק מהפסקה האחרונה לגבי השימוש באינדוקציה בפועל?',
    options: JSON.stringify(['מדענים ואנשים הפסיקו להשתמש באינדוקציה בעקבות הביקורת הפילוסופית', 'הוויכוח הפילוסופי הוכרע סופית לטובת האינדוקציה', 'למרות הבעיות הפילוסופיות, אינדוקציה ממשיכה להיות כלי חשיבה מרכזי ושימושי, ויש המנסים למצוא לה הצדקות פרגמטיות או הסתברותיות', 'אין כל קשר בין הוויכוח הפילוסופי לבין הפרקטיקה המדעית וחיי היומיום']),
    correctAnswer: 2,
    section: 'verbal',
    difficulty: 3
  },
  {
    content: 'מהי הנימה הכללית של הקטע ביחס לבעיית האינדוקציה?',
    options: JSON.stringify(['זלזול בחשיבותה של הבעיה', 'הצגת הבעיה כחידה פילוסופית שנפתרה לחלוטין', 'תיאור הבעיה כאתגר פילוסופי יסודי ומתמשך לידע האנושי, תוך הצגת פתרונות והסתייגויות', 'טענה שהבעיה רלוונטית רק למתמטיקאים ואינה נוגעת למדע או לחיים']),
    correctAnswer: 2,
    section: 'verbal',
    difficulty: 3
  }
];

const quantitativeQuestions = [
  {
    content: 'כמה פתרונות במספרים שלמים חיוביים יש למשוואה x1​+y1​=41​?',
    options: JSON.stringify(['3', '5', '7', '9']),
    correctAnswer: 0,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'ברז א\' ממלא בריכה ב-6 שעות. ברז ב\' מרוקן את אותה בריכה ב-10 שעות. אם שני הברזים נפתחים יחד כשהבריכה ריקה, תוך כמה זמן תתמלא הבריכה?',
    options: JSON.stringify(['4 שעות', '15 שעות', '16 שעות', '9 שעות']),
    correctAnswer: 1,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'נתון משולש ABC. הנקודות D, E, F הן אמצעי הצלעות BC, AC, AB בהתאמה. מה היחס בין שטח המשולש DEF לשטח המשולש ABC?',
    options: JSON.stringify(['1:2', '1:3', '1:4', '2:3']),
    correctAnswer: 2,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'בכמה עלה מחיר מוצר, אם לאחר שהוזל ב- 19%, מחירו הנוכחי הוא 19% פחות ממחירו לאחר ההוזלה הקודמת (הוזלה נוספת של 19%)? המחיר הסופי נמוך ב-152 ש"ח ממחירו המקורי.',
    options: JSON.stringify(['400 ש"ח', '500 ש"ח', '600 ש"ח', '450 ש"ח']),
    correctAnswer: 1,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'מצא את ספרת היחידות של המספר 72025.',
    options: JSON.stringify(['1', '3', '7', '9']),
    correctAnswer: 2,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'ממוצע הגילים בקבוצה של n אנשים הוא 40. אם מצטרף לקבוצה אדם שגילו 60, הממוצע החדש הוא 42. מהו n?',
    options: JSON.stringify(['8', '9', '10', '11']),
    correctAnswer: 1,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'במעגל שרדיוסו R חסום משושה משוכלל. מה היחס בין שטח המשושה לשטח המעגל?',
    options: JSON.stringify(['2π33​​', 'π23​​', 'π3​', 'π3​​']),
    correctAnswer: 0,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'נתון כי x ו-y מספרים ממשיים המקיימים x2+y2=1. מהו הערך המקסימלי של הביטוי x+y?',
    options: JSON.stringify(['1', '2​', '2', '1.5']),
    correctAnswer: 1,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'במסיבה 5 זוגות נשואים. בוחרים באקראי 4 אנשים. מה ההסתברות שנבחר בדיוק זוג נשוי אחד?',
    options: JSON.stringify(['(410​)(15​)(24​)×22​', '(410​)5×8×6​', '(410​)5×(28​)​', '(410​)5×4×3×2​']),
    correctAnswer: 1,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'פתור את אי-השוויון: ∣x−3∣+∣x+1∣≤4',
    options: JSON.stringify(['−1≤x≤3', 'x≤−1 או x≥3', '−2≤x≤2', 'אין פתרון']),
    correctAnswer: 0,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'מכונית נוסעת מ-A ל-B במהירות v1​. בדרכה חזרה מ-B ל-A היא נוסעת במהירות v2​. מה המהירות הממוצעת של המכונית לכל הנסיעה הלוך ושוב?',
    options: JSON.stringify(['2v1​+v2​​', 'v1​v2​​', 'v1​+v2​2v1​v2​​', '2∣v1​−v2​∣​']),
    correctAnswer: 2,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'מהו סכום הטור האינסופי: 1+31​+91​+271​+...?',
    options: JSON.stringify(['2', '1.5', '34​', '∞']),
    correctAnswer: 1,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'גוף חלול בצורת קובייה שאורך צלעה הפנימי 4 ס"מ, עשוי מחומר שעובי דפנותיו 1 ס"מ. מהו נפח החומר שממנו עשוי הגוף?',
    options: JSON.stringify(['216−64=152', '125−64=61', '63−43=216−64=152', '53−43=125−64=61']),
    correctAnswer: 2,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'מהו ערך הביטוי 6+6+6+...​​​?',
    options: JSON.stringify(['2', '6​', '3', '23​']),
    correctAnswer: 2,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'בכמה דרכים ניתן לסדר 4 ספרי מתמטיקה שונים ו-3 ספרי פיזיקה שונים על מדף כך שכל ספרי המתמטיקה יעמדו יחד וכל ספרי הפיזיקה יעמדו יחד?',
    options: JSON.stringify(['4!×3!', '7!', '2×4!×3!', '(47​)×4!×3!']),
    correctAnswer: 2,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'נתון מעגל x2+y2=25. ישר y=mx+b משיק למעגל בנקודה (3, 4). מהו ערכו של m?',
    options: JSON.stringify(['43​', '−43​', '34​', '−34​']),
    correctAnswer: 1,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'תמיסת מלח בריכוז 15% ובמשקל 200 גרם עורבבה עם תמיסת מלח בריכוז 30% ובמשקל 300 גרם. מהו ריכוז המלח בתערובת החדשה?',
    options: JSON.stringify(['20%', '22.5%', '24%', '25%']),
    correctAnswer: 2,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'מספר N משאיר שארית 3 בחלוקה ל-7. מהי השארית שתתקבל מחלוקת המספר 2N+5 ב-7?',
    options: JSON.stringify(['0', '2', '4', '5']),
    correctAnswer: 2,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'תיק מכיל 4 כדורים אדומים ו-6 כדורים כחולים. מוציאים באקראי 3 כדורים ללא החזרה. מה ההסתברות שכל הכדורים שהוצאו הם מאותו הצבע?',
    options: JSON.stringify(['(310​)(34​)​+(310​)(36​)​', '(310​)4×3×2+6×5×4​', '104​×93​×82​+106​×95​×84​', 'כל התשובות (1)-(3) נכונות ושקולות']),
    correctAnswer: 3,
    section: 'quantitative',
    difficulty: 3
  },
  {
    content: 'אם f(x)=x2+1 ו- g(x)=2x−1. מהי הפונקציה המורכבת f(g(x))?',
    options: JSON.stringify(['(x2+1)(2x−1)', '(2x−1)2+1', '2(x2+1)−1', '2x2+1']),
    correctAnswer: 1,
    section: 'quantitative',
    difficulty: 3
  }
];

const englishQuestions = [
  {
    content: 'The committee\'s final report was criticized for its _______ conclusions, which seemed to deliberately avoid addressing the core issues.',
    options: JSON.stringify(['trenchant', 'unequivocal', 'perspicacious', 'equivocal']),
    correctAnswer: 3,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'His _______ arguments, though presented with rhetorical flourish, ultimately lacked substantive evidence.',
    options: JSON.stringify(['compelling', 'incontrovertible', 'specious', 'rigorous']),
    correctAnswer: 2,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'The philosopher\'s work attempted to _______ the seemingly disparate fields of existentialism and phenomenology.',
    options: JSON.stringify(['bifurcate', 'excoriate', 'synthesize', 'repudiate']),
    correctAnswer: 2,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'Years of _______ living had taken their toll, leaving him physically weakened and spiritually adrift.',
    options: JSON.stringify(['temperate', 'abstemious', 'dissolute', 'virtuous']),
    correctAnswer: 2,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'Her _______ nature made her ill-suited for the cutthroat world of corporate politics.',
    options: JSON.stringify(['pugnacious', 'mercenary', 'guileless', 'rapacious']),
    correctAnswer: 2,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'The discovery of the ancient artifact _______ the prevailing historical narrative, forcing a reevaluation of the period.',
    options: JSON.stringify(['buttressed', 'obviated', 'corroborated', 'subverted']),
    correctAnswer: 3,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'He delivered a _______ against the perceived moral failings of contemporary society.',
    options: JSON.stringify(['panegyric', 'encomium', 'jeremiad', 'citation']),
    correctAnswer: 2,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'The _______ details included in the witness\'s testimony added credibility to her account.',
    options: JSON.stringify(['extraneous', 'spurious', 'salient', 'granular']),
    correctAnswer: 3,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'The patina of erudition barely concealed a profound intellectual insecurity.',
    options: JSON.stringify(['His deep intellectual confidence was evident despite his lack of scholarly appearance', 'The superficial appearance of deep learning thinly veiled a significant lack of confidence in his own intellect', 'His profound knowledge was matched by an equally profound sense of intellectual security', 'Intellectual insecurity prevented him from acquiring even a veneer of erudition']),
    correctAnswer: 1,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'It behooves us to consider the potential ramifications before embarking on such a precipitous course of action.',
    options: JSON.stringify(['Acting hastily without considering the consequences is the recommended course of action', 'We are obligated to reflect on the possible outcomes prior to undertaking such a rash action', 'The potential ramifications prevent us from considering any course of action, however cautious', 'It is unnecessary to consider the consequences when the course of action is clearly beneficial']),
    correctAnswer: 1,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'The artist\'s oeuvre is characterized by a protean quality, defying easy categorization.',
    options: JSON.stringify(['The artist\'s entire body of work is monotonous and easily classified', 'A quality of tending towards easy categorization defines the artist\'s work', 'The variable and diverse nature of the artist\'s collective works makes them difficult to classify simply', 'Difficulty in categorization is irrelevant to the unchanging quality of the artist\'s oeuvre']),
    correctAnswer: 2,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'His perspicacious analysis cut through the obfuscation surrounding the issue.',
    options: JSON.stringify(['His confusing analysis added to the lack of clarity concerning the issue', 'His insightful examination clarified the deliberately confusing aspects of the matter', 'He failed to analyze the issue due to its inherent obfuscation', 'His analysis, while clear, avoided the central, obfuscated elements of the issue']),
    correctAnswer: 1,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'What is the primary subject of the passage about epigenetics?',
    options: JSON.stringify(['The structure of DNA sequences', 'Darwinian evolutionary theory', 'The field of epigenetics: its mechanisms, implications, and relation to inheritance', 'Lamarck\'s theory of acquired characteristics']),
    correctAnswer: 2,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'According to the passage, epigenetic modifications primarily affect:',
    options: JSON.stringify(['the underlying DNA sequence', 'the regulation of gene expression (which genes are active)', 'the rate of random genetic mutations', 'the process of natural selection']),
    correctAnswer: 1,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'The passage suggests that the heritability of some epigenetic changes is significant because it:',
    options: JSON.stringify(['proves Lamarck\'s original theory was entirely correct', 'confirms that DNA is the sole mediator of inheritance', 'offers a potential mechanism for faster adaptation and transgenerational effects beyond DNA sequence', 'indicates that environmental factors cannot influence genetics']),
    correctAnswer: 2,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'The term "Lamarckian element" implies a mechanism involving:',
    options: JSON.stringify(['random mutation and selection', 'the inheritance of characteristics acquired or modified during an organism\'s lifetime', 'the complete stability of the genome across generations', 'genetic drift in small populations']),
    correctAnswer: 1,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'What can be inferred about the current scientific consensus regarding transgenerational epigenetic inheritance?',
    options: JSON.stringify(['It is fully understood and universally accepted as a major evolutionary force', 'It is considered theoretically impossible', 'Its precise role, extent, and significance, particularly in complex organisms, are still under active investigation and discussion', 'It is relevant only for plants and bacteria, not animals']),
    correctAnswer: 2,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'What was the initial focus of hermeneutics according to the passage?',
    options: JSON.stringify(['The explanation of natural phenomena', 'The interpretation of religious and classical texts', 'The analysis of economic systems', 'The development of scientific methods']),
    correctAnswer: 1,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'How did Dilthey differentiate the human sciences (Geisteswissenschaften) from the natural sciences?',
    options: JSON.stringify(['Human sciences use explanation (Erklären), while natural sciences use interpretation (Verstehen)', 'Human sciences aim for interpretive understanding (Verstehen), while natural sciences seek causal explanation (Erklären)', 'Both sciences primarily use interpretive understanding (Verstehen)', 'Neither science involves interpretation according to Dilthey']),
    correctAnswer: 1,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'What constitutes the "fusion of horizons" in Gadamer\'s hermeneutics?',
    options: JSON.stringify(['The merging of grammatical and psychological analysis', 'The complete rejection of the interpreter\'s own perspective', 'The dialogue and integration between the interpreter\'s historical context and that of the text/artifact', 'The separation of the text\'s meaning from the author\'s intention']),
    correctAnswer: 2,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'According to Gadamer, what is the role of "prejudices" (pre-judgments) in interpretation?',
    options: JSON.stringify([
      'They are obstacles that must be eliminated to achieve objective understanding.',
      'They are irrelevant to the interpretive process.',
      'They form the necessary, unavoidable starting point for any act of understanding.',
      'They guarantee the absolute truth of an interpretation.'
    ]),
    correctAnswer: 2,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'What is a major implication of the later hermeneutics described in the passage?',
    options: JSON.stringify([
      'Objective meaning, independent of interpretation, is easily accessible.',
      'Understanding is primarily ahistorical and universal.',
      'The interpreter\'s background and questions play a crucial role in shaping the meaning derived from a text or event.',
      'Language is merely a transparent tool for conveying pre-existing meanings.'
    ]),
    correctAnswer: 2,
    section: 'english',
    difficulty: 3
  }
];

async function main() {
  console.log('Seeding database...');

  // Clear existing questions
  await prisma.question.deleteMany();
  console.log('Cleared existing questions');

  // Add quantitative questions
  const quantitativeQuestions = [
    {
      content: 'כמה פתרונות במספרים שלמים חיוביים יש למשוואה x1​+y1​=41​?',
      options: JSON.stringify(['3', '5', '7', '9']),
      correctAnswer: 0,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'ברז א\' ממלא בריכה ב-6 שעות. ברז ב\' מרוקן את אותה בריכה ב-10 שעות. אם שני הברזים נפתחים יחד כשהבריכה ריקה, תוך כמה זמן תתמלא הבריכה?',
      options: JSON.stringify(['4 שעות', '15 שעות', '16 שעות', '9 שעות']),
      correctAnswer: 1,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'נתון משולש ABC. הנקודות D, E, F הן אמצעי הצלעות BC, AC, AB בהתאמה. מה היחס בין שטח המשולש DEF לשטח המשולש ABC?',
      options: JSON.stringify(['1:2', '1:3', '1:4', '2:3']),
      correctAnswer: 2,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'בכמה עלה מחיר מוצר, אם לאחר שהוזל ב- 19%, מחירו הנוכחי הוא 19% פחות ממחירו לאחר ההוזלה הקודמת? המחיר הסופי נמוך ב-152 ש"ח ממחירו המקורי.',
      options: JSON.stringify(['400 ש"ח', '500 ש"ח', '600 ש"ח', '450 ש"ח']),
      correctAnswer: 1,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'מצא את ספרת היחידות של המספר 72025.',
      options: JSON.stringify(['1', '3', '7', '9']),
      correctAnswer: 2,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'ממוצע הגילים בקבוצה של n אנשים הוא 40. אם מצטרף לקבוצה אדם שגילו 60, הממוצע החדש הוא 42. מהו n?',
      options: JSON.stringify(['8', '9', '10', '11']),
      correctAnswer: 1,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'במעגל שרדיוסו R חסום משושה משוכלל. מה היחס בין שטח המשושה לשטח המעגל?',
      options: JSON.stringify(['2π/3', 'π/2', 'π/3', '3π']),
      correctAnswer: 0,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'נתון כי x ו-y מספרים ממשיים המקיימים x²+y²=1. מהו הערך המקסימלי של הביטוי x+y?',
      options: JSON.stringify(['1', '√2', '2', '1.5']),
      correctAnswer: 1,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'במסיבה 5 זוגות נשואים. בוחרים באקראי 4 אנשים. מה ההסתברות שנבחר בדיוק זוג נשוי אחד?',
      options: JSON.stringify(['(10,4)(5,1)(2,4)/2', '(10,4)5×8×6', '(10,4)5×(8,2)', '(10,4)5×4×3×2']),
      correctAnswer: 1,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'פתור את אי-השוויון: |x−3|+|x+1|≤4',
      options: JSON.stringify(['−1≤x≤3', 'x≤−1 או x≥3', '−2≤x≤2', 'אין פתרון']),
      correctAnswer: 0,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'מכונית נוסעת מ-A ל-B במהירות v₁. בדרכה חזרה מ-B ל-A היא נוסעת במהירות v₂. מה המהירות הממוצעת של המכונית לכל הנסיעה הלוך ושוב?',
      options: JSON.stringify(['2v₁+v₂', 'v₁v₂', '2v₁v₂/(v₁+v₂)', '2|v₁−v₂|']),
      correctAnswer: 2,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'מהו סכום הטור האינסופי: 1+1/3+1/9+1/27+...?',
      options: JSON.stringify(['2', '1.5', '3/4', '∞']),
      correctAnswer: 1,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'גוף חלול בצורת קובייה שאורך צלעה הפנימי 4 ס"מ, עשוי מחומר שעובי דפנותיו 1 ס"מ. מהו נפח החומר שממנו עשוי הגוף?',
      options: JSON.stringify(['216−64=152', '125−64=61', '6³−4³=216−64=152', '5³−4³=125−64=61']),
      correctAnswer: 2,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'מהו ערך הביטוי √6+√6+√6+...?',
      options: JSON.stringify(['2', '√6', '3', '2/3']),
      correctAnswer: 2,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'בכמה דרכים ניתן לסדר 4 ספרי מתמטיקה שונים ו-3 ספרי פיזיקה שונים על מדף כך שכל ספרי המתמטיקה יעמדו יחד וכל ספרי הפיזיקה יעמדו יחד?',
      options: JSON.stringify(['4!×3!', '7!', '2×4!×3!', '(7,4)×4!×3!']),
      correctAnswer: 2,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'נתון מעגל x²+y²=25. ישר y=mx+b משיק למעגל בנקודה (3, 4). מהו ערכו של m?',
      options: JSON.stringify(['4/3', '−4/3', '3/4', '−3/4']),
      correctAnswer: 1,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'תמיסת מלח בריכוז 15% ובמשקל 200 גרם עורבבה עם תמיסת מלח בריכוז 30% ובמשקל 300 גרם. מהו ריכוז המלח בתערובת החדשה?',
      options: JSON.stringify(['20%', '22.5%', '24%', '25%']),
      correctAnswer: 2,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'מספר N משאיר שארית 3 בחלוקה ל-7. מהי השארית שתתקבל מחלוקת המספר 2N+5 ב-7?',
      options: JSON.stringify(['0', '2', '4', '5']),
      correctAnswer: 2,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'תיק מכיל 4 כדורים אדומים ו-6 כדורים כחולים. מוציאים באקראי 3 כדורים ללא החזרה. מה ההסתברות שכל הכדורים שהוצאו הם מאותו הצבע?',
      options: JSON.stringify(['(10,3)(4,3)+(10,3)(6,3)', '(10,3)4×3×2+6×5×4', '10C4×9C3×8C2+10C6×9C5×8C4', 'כל התשובות (1)-(3) נכונות ושקולות']),
      correctAnswer: 3,
      section: 'quantitative',
      difficulty: 3
    },
    {
      content: 'אם f(x)=x²+1 ו- g(x)=2x−1. מהי הפונקציה המורכבת f(g(x))?',
      options: JSON.stringify(['(x²+1)(2x−1)', '(2x−1)²+1', '2(x²+1)−1', '2x²+1']),
      correctAnswer: 1,
      section: 'quantitative',
      difficulty: 3
    }
  ];

  // Add the questions to the database
  await prisma.question.createMany({
    data: quantitativeQuestions
  });

  console.log(`Added ${quantitativeQuestions.length} quantitative questions`);
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 