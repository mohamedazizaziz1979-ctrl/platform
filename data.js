/* ==========================================================
   DATA — منهج المنصة (المراحل، الصفوف، الوحدات، الدروس).
   هذا الملف الوحيد الذي يجب تعديله لإضافة صف أو وحدة أو درس جديد.
   لإضافة صف جديد: أضف مفتاحًا بمعرّف الصف (مثل pp2) بنفس بنية pp1.
   لإضافة فيديو لدرس: video:'رابط يوتيوب أو Vimeo أو mp4'، وملخص: notes:'...'
   ========================================================== */
const STAGES=[
 {id:'primary',ar:'المرحلة الابتدائية',short:'الابتدائية',cls:'s-primary',desc:'من الصف الأول إلى السادس',
  grades:[['pr1','الصف الأول الابتدائي'],['pr2','الصف الثاني الابتدائي'],['pr3','الصف الثالث الابتدائي'],['pr4','الصف الرابع الابتدائي'],['pr5','الصف الخامس الابتدائي'],['pr6','الصف السادس الابتدائي']]},
 {id:'prep',ar:'المرحلة الإعدادية',short:'الإعدادية',cls:'s-prep',desc:'من الصف الأول إلى الثالث',
  grades:[['pp1','الصف الأول الإعدادي'],['pp2','الصف الثاني الإعدادي'],['pp3','الصف الثالث الإعدادي']]}
];

/* لإضافة محتوى صف جديد: أضف مفتاحًا بمعرّف الصف (مثل pp2) بنفس بنية pp1.
   لإضافة فيديو لدرس: video:'رابط يوتيوب أو Vimeo أو mp4' وملخص مكتوب اختياري: notes:'...' */
const BASE={
 pp1:{units:[{
  en:'Family and Friends',ar:'العائلة والأصدقاء',
  lessons:[
  {
   en:'My Family',ar:'عائلتي',
   vocab:[
    {w:'family',ar:'عائلة',ex:'We are a big family.'},
    {w:'mother',ar:'أم',ex:'My mother cooks dinner every evening.'},
    {w:'father',ar:'أب',ex:'My father works in a bank.'},
    {w:'brother',ar:'أخ',ex:'I have one brother.'},
    {w:'sister',ar:'أخت',ex:'My sister is eight years old.'},
    {w:'grandfather',ar:'جد',ex:'My grandfather lives in Alexandria.'},
    {w:'grandmother',ar:'جدة',ex:'My grandmother tells us stories.'},
    {w:'uncle',ar:'عم / خال',ex:'My uncle is a doctor.'},
    {w:'aunt',ar:'عمة / خالة',ex:'My aunt visits us on Fridays.'},
    {w:'cousin',ar:'ابن العم / ابن الخال',ex:'My cousin is my best friend.'},
    {w:'kind',ar:'لطيف / طيب',ex:'My grandmother is very kind.'},
    {w:'together',ar:'معًا',ex:'We eat lunch together on Friday.'}
   ],
   listen:{title:'Omar and his family',text:"My name is Omar. I am twelve years old and I live in Cairo with my family. There are five people in my family. My father is an engineer and my mother is a teacher. I have one brother and one sister. My brother, Youssef, is fifteen. My sister, Salma, is eight. Every Friday, we visit my grandparents. My grandfather is very funny, and my grandmother is very kind. She cooks delicious food for us. My uncle and my aunt come too, with my cousin, Nour. We eat lunch together and play games in the garden. I love my family very much."},
   exam:{
    conv:[
     {who:'Ali',text:'Hello, Omar! How are you?'},
     {who:'Omar',gap:{o:["I'm fine, thank you.","I'm twelve years old.","It's on the table."],a:0}},
     {who:'Ali',text:'How many people are there in your family?'},
     {who:'Omar',gap:{o:['He is an engineer.','There are five people.','I like pizza.'],a:1}},
     {who:'Ali',text:'What does your father do?'},
     {who:'Omar',gap:{o:['We live in Cairo.','She is my sister.','He is an engineer.'],a:2}},
     {who:'Ali',text:'Do you visit your grandparents?'},
     {who:'Omar',gap:{o:['Yes, we visit them every Friday.','No, he is a doctor.','Yes, it is.'],a:0}}
    ],
    cloze:{box:['kind','together','cousin','family','brother','cooks','uncle'],
     text:'I have a big {1}. My {2} Youssef is fifteen years old. My grandmother is very {3}. She {4} delicious food. We eat lunch {5} on Fridays. My {6} Nour plays with me in the garden.',
     ans:['family','brother','kind','cooks','together','cousin']},
    read:{title:'A Family Day in the Park',
     text:"Last Friday, the Hassan family spent a wonderful day at Al-Azhar Park in Cairo. Mr. Hassan drove the car, and Mrs. Hassan brought sandwiches, fruit and cold juice. Their two children, Mona and Karim, were very excited. When they arrived, Mona ran to the playground, but Karim helped his father carry the bags. Then, the family sat under a big tree and had lunch together. After lunch, Mr. Hassan played football with Karim, while Mona and her mother walked around the beautiful gardens and took photos. In the evening, they were tired but happy. On the way home, Mona said, \"This was the best day of my life!\"",
     mcq:[{q:'Where did the Hassan family go?',o:['To Alexandria.','To Al-Azhar Park.','To the school.'],a:1},
          {q:'Who helped Mr. Hassan carry the bags?',o:['Mona','Mrs. Hassan','Karim'],a:2}],
     wr:[{q:'What did Mrs. Hassan bring?',m:'She brought sandwiches, fruit and cold juice.'},
         {q:'What did Mona and her mother do after lunch?',m:'They walked around the gardens and took photos.'},
         {q:'How did the family feel in the evening?',m:'They were tired but happy.'}]},
    mcq:[
     {q:'My mother is a teacher. ___ works at a school.',o:['He','She','It'],a:1},
     {q:'There ___ five people in my family.',o:['is','am','are'],a:2},
     {q:"My father's brother is my ___.",o:['uncle','cousin','aunt'],a:0},
     {q:'We ___ our grandparents every Friday.',o:['visits','visit','visiting'],a:1},
     {q:'My sister ___ eight years old.',o:['are','is','am'],a:1}
    ],
    rewrite:[
     {s:'Omar lives in Cairo.',b:'Where',m:'Where does Omar live?'},
     {s:'Salma is eight years old.',b:'Is',m:'Is Salma eight years old?'},
     {s:'My cousin plays in the garden.',b:'every Friday',m:'My cousin plays in the garden every Friday.'}
    ],
    fix:[
     {s:'My brother (have) a new bike.',a:'has'},
     {s:'There (is) five people in my family.',a:'are'},
     {s:'My grandmother (cook) delicious food.',a:'cooks'},
     {s:'We (visits) our uncle on Fridays.',a:'visit'},
     {s:'She (are) very kind.',a:'is'}
    ],
    para:{topic:'Write a paragraph of no less than 100 words about your family.',tips:['Who is in your family?','What do they do?','How old are they?','What do you do together?']}
   }
  },
  {
   en:'My Daily Routine',ar:'روتيني اليومي',
   vocab:[
    {w:'wake up',ar:'يستيقظ',ex:'I wake up at six o\'clock.'},
    {w:'brush',ar:'يفرّش',ex:'I brush my teeth twice a day.'},
    {w:'breakfast',ar:'وجبة الإفطار',ex:'We have breakfast at seven.'},
    {w:'school',ar:'مدرسة',ex:'I go to school by bus.'},
    {w:'lesson',ar:'حصة / درس',ex:'We have six lessons every day.'},
    {w:'homework',ar:'واجب منزلي',ex:'I do my homework after lunch.'},
    {w:'dinner',ar:'عشاء',ex:'We have dinner at eight.'},
    {w:'sleep',ar:'ينام',ex:'I go to sleep at nine thirty.'},
    {w:'always',ar:'دائمًا',ex:'I always wake up early.'},
    {w:'usually',ar:'عادةً',ex:'I usually have eggs for breakfast.'},
    {w:'sometimes',ar:'أحيانًا',ex:'Sometimes I play with my cousin.'}
   ],
   listen:{title:"Salma's day",text:"Hi! My name is Salma and this is my daily routine. I always wake up at six o'clock in the morning. First, I brush my teeth and wash my face. Then I have breakfast with my family. I usually have eggs, cheese and a glass of milk. At seven thirty, I go to school by bus. We have six lessons every day, and my favourite lesson is English. I get home at two o'clock and have lunch. After that, I do my homework. Sometimes I play with my cousin in the afternoon. We have dinner at eight o'clock. Finally, I read a short story and go to sleep at nine thirty."},
   exam:{
    conv:[
     {who:'Mona',text:'What time do you wake up?'},
     {who:'Salma',gap:{o:["I wake up at six o'clock.",'I have breakfast.','It is a lesson.'],a:0}},
     {who:'Mona',text:'Do you go to school by bus?'},
     {who:'Salma',gap:{o:['Yes, I am.','Yes, I do.',"No, it isn't."],a:1}},
     {who:'Mona',text:'What is your favourite lesson?'},
     {who:'Salma',gap:{o:['I have breakfast at seven.','She is my friend.','My favourite lesson is English.'],a:2}},
     {who:'Mona',text:'When do you do your homework?'},
     {who:'Salma',gap:{o:["It's a new book.",'I do it after lunch.','He goes to bed.'],a:1}}
    ],
    cloze:{box:['wake','brush','breakfast','school','homework','sleep','usually'],
     text:'Every morning, I {1} up at six o\'clock. I {2} my teeth and have {3}. Then I go to {4} by bus. In the afternoon, I do my {5}. I {6} have dinner at eight, and I go to {7} at nine thirty.',
     ans:['wake','brush','breakfast','school','homework','usually','sleep']},
    read:{title:'A Busy Day for Dr. Amira',
     text:"Dr. Amira is a doctor in a hospital in Assiut. Her day is very busy. She wakes up at five thirty every morning and has a light breakfast. At seven o'clock, she drives to the hospital, and it takes her twenty minutes. She usually sees about thirty patients a day. At two o'clock, she has lunch in the hospital garden with her friend, Dr. Hany. In the evening, she goes home and helps her son, Adam, with his homework. Sometimes, they cook dinner together. Dr. Amira loves her job, but she always tries to sleep early because she needs to be ready for the next day.",
     mcq:[{q:'Where does Dr. Amira work?',o:['At a school.','In a hospital.','In a bank.'],a:1},
          {q:'How long does it take her to reach the hospital?',o:['Twenty minutes.','Two hours.','Five minutes.'],a:0}],
     wr:[{q:'What time does she wake up?',m:'She wakes up at five thirty.'},
         {q:'Who does she have lunch with?',m:'She has lunch with her friend, Dr. Hany.'},
         {q:'What does she do in the evening?',m:'She goes home and helps her son with his homework.'}]},
    mcq:[
     {q:'She ___ to school by bus.',o:['go','goes','going'],a:1},
     {q:'We have breakfast ___ seven o\'clock.',o:['in','on','at'],a:2},
     {q:'I ___ my homework after lunch.',o:['do','does','doing'],a:0},
     {q:'My brother ___ plays football on Fridays.',o:['sometime','some time','sometimes'],a:2},
     {q:'What time ___ you wake up?',o:['does','do','are'],a:1}
    ],
    rewrite:[
     {s:'I wake up at six o\'clock.',b:'She',m:'She wakes up at six o\'clock.'},
     {s:'Salma goes to school by bus.',b:'Does',m:'Does Salma go to school by bus?'},
     {s:'They have dinner at eight.',b:'What time',m:'What time do they have dinner?'}
    ],
    fix:[
     {s:'My father (wake) up at five.',a:'wakes'},
     {s:'She (do) her homework every day.',a:'does'},
     {s:'The children (goes) to school early.',a:'go'},
     {s:'He (have) breakfast at seven.',a:'has'},
     {s:'I (brushes) my teeth twice a day.',a:'brush'}
    ],
    para:{topic:'Write a paragraph of no less than 100 words about your daily routine.',tips:['What time do you wake up?','What do you have for breakfast?','How do you go to school?','What do you do in the afternoon and evening?']}
   }
  }]
 }]}
};
