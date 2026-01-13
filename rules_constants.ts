
export interface ShariaRule {
    id: string;
    categoryEn: string;
    categoryUr: string;
    titleEn: string;
    titleUr: string;
    contentEn: string;
    contentUr: string;
}

export const SHARIA_RULES: ShariaRule[] = [
    { id: "1", categoryEn: "Prescribed Shares", categoryUr: "مقررہ حصے", titleEn: "1) Husband [AnNisa 4:12]", titleUr: "1) شوہر", contentEn: "a. Gets 1/2 (No offspring)\nb. Gets 1/4 (Has offspring)", contentUr: "الف۔ 1/2 (اولاد نہ ہو)\nب۔ 1/4 (اولاد ہو)" },
    { id: "2", categoryEn: "Prescribed Shares", categoryUr: "مقررہ حصے", titleEn: "2) Wife [AnNisa 4:12]", titleUr: "2) بیوی", contentEn: "a. Gets 1/4 (No offspring)\nb. Gets 1/8 (Has offspring)", contentUr: "الف۔ 1/4 (اولاد نہ ہو)\nب۔ 1/8 (اولاد ہو)" },
    { id: "3", categoryEn: "Prescribed Shares", categoryUr: "مقررہ حصے", titleEn: "3) Daughter", titleUr: "3) بیٹی", contentEn: "a. Gets 1/2 (1 daughter, no son)\nb. Gets 2/3 (Multiple, no son)", contentUr: "الف۔ 1/2 (ایک بیٹی)\nب۔ 2/3 (زیادہ بیٹیاں)" },
    { id: "4", categoryEn: "Prescribed Shares", categoryUr: "مقررہ حصے", titleEn: "4) Grand Daughter", titleUr: "4) پوتی", contentEn: "a. 1/2, b. 2/3, c. 1/6 (if 1 daughter present)", contentUr: "الف۔ 1/2، ب۔ 2/3، ج۔ 1/6" },
    { id: "5", categoryEn: "Prescribed Shares", categoryUr: "مقررہ حصے", titleEn: "5) Father", titleUr: "5) والد", contentEn: "a. Gets 1/6 (Has offspring)", contentUr: "الف۔ 1/6 (اولاد ہو)" },
    { id: "6", categoryEn: "Prescribed Shares", categoryUr: "مقررہ حصے", titleEn: "6) Mother", titleUr: "6) والدہ", contentEn: "a. 1/3 (No offspring/siblings)\nb. 1/6 (Offspring/multiple siblings)", contentUr: "الف۔ 1/3، ب۔ 1/6" },
    { id: "7", categoryEn: "Prescribed Shares", categoryUr: "مقررہ حصے", titleEn: "7) Paternal Grand Father", titleUr: "7) دادا", contentEn: "a. 1/6 (No father, has offspring)", contentUr: "الف۔ 1/6 (والد نہ ہو، اولاد ہو)" },
    { id: "8", categoryEn: "Prescribed Shares", categoryUr: "مقررہ حصے", titleEn: "8) Paternal Grand Mother", titleUr: "8) دادی", contentEn: "a. 1/6 (No father/mother/maternal grandma)\nb. 1/12 (With maternal grandma)", contentUr: "الف۔ 1/6، ب۔ 1/12" },
    { id: "9", categoryEn: "Prescribed Shares", categoryUr: "مقررہ حصے", titleEn: "9) Maternal Grand Mother", titleUr: "9) نانی", contentEn: "a. 1/6 (No mother)\nb. 1/12 (With paternal grandma)", contentUr: "الف۔ 1/6، ب۔ 1/12" },
    { id: "10", categoryEn: "Prescribed Shares", categoryUr: "مقررہ حصے", titleEn: "10) Full Sister", titleUr: "10) سگی بہن", contentEn: "a. 1/2 (1 sister), b. 2/3 (Multiple)", contentUr: "الف۔ 1/2، ب۔ 2/3" },
    { id: "11", categoryEn: "Prescribed Shares", categoryUr: "مقررہ حصے", titleEn: "11) Paternal Sister", titleUr: "11) علاتی بہن", contentEn: "a. 1/2, b. 2/3, c. 1/6 (with 1 full sister)", contentUr: "الف۔ 1/2، ب۔ 2/3، ج۔ 1/6" },
    { id: "12", categoryEn: "Prescribed Shares", categoryUr: "مقررہ حصے", titleEn: "12) Maternal Sibling", titleUr: "12) اخیافی بہن بھائی", contentEn: "a. 1/6 (Single), b. 1/3 (Multiple)", contentUr: "الف۔ 1/6، ب۔ 1/3" },
    { id: "13", categoryEn: "Blocking Rules", categoryUr: "محرومی کے قوانین", titleEn: "13) Blocking Hierarchy", titleUr: "13) محرومی کی ترتیب", contentEn: "Son, Grandson, Father, Mother etc. block lower relatives.", contentUr: "بیٹا، پوتا، والد اور والدہ دوسروں کو محروم کرتے ہیں۔" },
    { id: "14", categoryEn: "Ta'seeb (Residue)", categoryUr: "تعصیب", titleEn: "14) Tasib ranking", titleUr: "14) عصبہ کی ترتیب", contentEn: "1) Son, 2) Grandson, 3) Father, 4) Full Brother...", contentUr: "1) بیٹا، 2) پوتا، 3) والد، 4) سگا بھائی..." },
    { id: "15", categoryEn: "Ta'seeb (Residue)", categoryUr: "تعصیب", titleEn: "15) 2:1 Ratio", titleUr: "15) 2:1 تناسب", contentEn: "Male gets twice as much as female in same class.", contentUr: "مرد کو عورت سے دوگنا ملے گا۔" },
    { id: "16", categoryEn: "Ta'seeb (Residue)", categoryUr: "تعصیب", titleEn: "16) Drop from Ta'seeb", titleUr: "16) تعصیب سے اخراج", contentEn: "Prescribed heir drops if other aaseebs exist (excl. father).", contentUr: "مقررہ وارث دوسرے عصبہ کی موجودگی میں خارج ہو جاتا ہے۔" },
    { id: "17", categoryEn: "Ta'seeb (Residue)", categoryUr: "تعصیب", titleEn: "17) Never cutoff", titleUr: "17) ناقابل محرومی", contentEn: "Father/Grandfather never cutoff by prescribed shares.", contentUr: "والد/دادا کبھی محروم نہیں ہوتے۔" },
    { id: "18", categoryEn: "Special Cases", categoryUr: "خصوصی حالات", titleEn: "18) 'Awal", titleUr: "18) عول", contentEn: "Proportional reduction if total > 1.", contentUr: "مجموعہ 1 سے زیادہ ہونے پر کمی۔" },
    { id: "19", categoryEn: "Special Cases", categoryUr: "خصوصی حالات", titleEn: "19) Radd", titleUr: "19) رد", contentEn: "Proportional increase if total < 1 (excl. spouse).", contentUr: "مجموعہ 1 سے کم ہونے پر اضافہ۔" },
    { id: "20", categoryEn: "Special Cases", categoryUr: "خصوصی حالات", titleEn: "20) Double Status", titleUr: "20) دوہری حیثیت", contentEn: "Treat as separate individuals for each qualification.", contentUr: "دوہری حیثیت کے وارث کو دونوں حصوں کی ادائیگی۔" },
    { id: "21", categoryEn: "Special Cases", categoryUr: "خصوصی حالات", titleEn: "21) Umar's Case", titleUr: "21) عامریہ", contentEn: "Parents share remainder 2:1 after spouse.", contentUr: "میاں/بیوی کے بعد والدین بقیہ کا 2:1 پائیں گے۔" },
    { id: "22", categoryEn: "Special Cases", categoryUr: "خصوصی حالات", titleEn: "22) Full vs Maternal", titleUr: "22) سگا بمقابلہ اخیافی", contentEn: "Full brother >= maternal sibling share.", contentUr: "سگے بھائی کا حصہ اخیافی سے کم نہیں ہو سکتا۔" },
    { id: "23", categoryEn: "Special Cases", categoryUr: "خصوصی حالات", titleEn: "23) Grandfather vs Sibling", titleUr: "23) دادا اور بہن بھائی", contentEn: "Grandfather gets max of 1/6 total, 1/3 residue or equal share.", contentUr: "دادا اور بہن بھائیوں میں تقسیم کا قاعدہ۔" },
    { id: "24", categoryEn: "Special Cases", categoryUr: "خصوصی حالات", titleEn: "24) Grandfather vs Sister", titleUr: "24) دادا اور بہن", contentEn: "Adjust if sister gets more than grandfather.", contentUr: "بقیہ میں 1:2 کا تناسب۔" },
    { id: "25", categoryEn: "Far Relatives", categoryUr: "دور کے رشتہ دار", titleEn: "25) Replacement link", titleUr: "25) متبادل واسطہ", contentEn: "Far relatives replace the link they are attached to.", contentUr: "دور کے رشتہ دار اپنے اصل واسطے کی جگہ لیں گے۔" },
    { id: "26", categoryEn: "Far Relatives", categoryUr: "دور کے رشتہ دار", titleEn: "26) Spouse residue", titleUr: "26) زوج کو بقیہ", contentEn: "Remaining can go to spouse if no other relatives.", contentUr: "کوئی رشتہ دار نہ ہو تو زوج کو بقیہ۔" },
    { id: "27", categoryEn: "Other Principles", categoryUr: "دیگر اصول", titleEn: "27) Islamic State", titleUr: "27) اسلامی ریاست", contentEn: "Bait-ul-Mal takes if no heirs survive.", contentUr: "کوئی وارث نہ ہو تو ترکہ بیت المال کا۔" },
    { id: "28", categoryEn: "Other Principles", categoryUr: "دیگر اصول", titleEn: "28) Female heirs stop", titleUr: "28) خواتین کا سلسلہ", contentEn: "Inheritance stops at females, doesn't move to children (excl. certain cases).", contentUr: "خواتین پر سلسلہ وارث رک جاتا ہے۔" },
    { id: "29", categoryEn: "Other Principles", categoryUr: "دیگر اصول", titleEn: "29) Grandchildren replace", titleUr: "29) پوتوں کا مقام", contentEn: "Grandchildren replace children if deceased.", contentUr: "اولاد کی جگہ پوتے پوتیاں لیں گے۔" },
    { id: "30", categoryEn: "General Principles", categoryUr: "عمومی اصول", titleEn: "30) 2/3 Zone", titleUr: "30) 2/3 زون", contentEn: "Specific female relatives share max 2/3.", contentUr: "دنی، پوتی، بہن کا 2/3 زمرہ۔" },
    { id: "31", categoryEn: "General Principles", categoryUr: "عمومی اصول", titleEn: "31) 2/3 split", titleUr: "31) 2/3 کی تقسیم", contentEn: "2/3 shared between offspring OR siblings only.", contentUr: "2/3 کی محدودیت۔" },
    { id: "32", categoryEn: "General Principles", categoryUr: "عمومی اصول", titleEn: "32) Maternals reduce Mother", titleUr: "32) والدہ کا حصہ کم ہونا", contentEn: "Maternal siblings reduce mother's share to 1/6.", contentUr: "اخیافی بھائی والدہ کا حصہ کم کرتے ہیں۔" },
    { id: "33", categoryEn: "General Principles", categoryUr: "عمومی اصول", titleEn: "33) Maternal ratio 1:1", titleUr: "33) اخیافی تناسب", contentEn: "Maternal siblings share equally (no 2:1).", contentUr: "اخیافی بھائی بہن برابر حصہ پاتے ہیں۔" },
    { id: "34", categoryEn: "General Principles", categoryUr: "عمومی اصول", titleEn: "34) Father blocks all siblings", titleUr: "34) والد کا مکمل حجب", contentEn: "Father blocks full, paternal, and maternal siblings.", contentUr: "والد تمام بہن بھائیوں کو محروم کرتا ہے۔" },
    { id: "35", categoryEn: "General Principles", categoryUr: "عمومی اصول", titleEn: "35) Non-Blockable 6", titleUr: "35) چھ لازمی وارث", contentEn: "Husband, Wife, Father, Mother, Son, Daughter.", contentUr: "وہ چھ وارث جو کبھی محروم نہیں ہوتے۔" },
    { id: "36", categoryEn: "General Principles", categoryUr: "عمومی اصول", titleEn: "36) Spouse Blocking", titleUr: "36) زوجین اور حجب", contentEn: "Spouse neither blocked nor blocks others.", contentUr: "میاں بیوی کا حجب سے استثنیٰ۔" },
    { id: "37", categoryEn: "General Principles", categoryUr: "عمومی اصول", titleEn: "37) Spouse Increase", titleUr: "37) زوجین اور رد", contentEn: "Spouse share normally not increased by Radd.", contentUr: "زوجین پر رد نہیں ہوتا۔" },
    { id: "38", categoryEn: "General Principles", categoryUr: "عمومی اصول", titleEn: "38) Role Promotion", titleUr: "38) قائم مقامی", contentEn: "Grandpa -> Father; Grandma -> Mother; etc.", contentUr: "قائم مقامی کے اصول۔" },
    { id: "39", categoryEn: "General Principles", categoryUr: "عمومی اصول", titleEn: "39) Maternal Grandpa", titleUr: "39) نانا", contentEn: "Maternal grandfather blocked from inheritance.", contentUr: "نانا وراثت سے محروم ہے۔" },
    { id: "40", categoryEn: "General Principles", categoryUr: "عمومی اصول", titleEn: "40) Female Chain", titleUr: "40) مادری سلسلہ", contentEn: "Mother's mother's chain continues indefinitely.", contentUr: "نانی کا سلسلہ جاری رہتا ہے۔" },
    { id: "41", categoryEn: "General Principles", categoryUr: "عمومی اصول", titleEn: "41) Father blocks Grandma", titleUr: "41) والد اور دادی", contentEn: "Father blocks paternal grandmother (Consensus).", contentUr: "والد دادی کو محروم کرتا ہے۔" },
    { id: "42", categoryEn: "General Principles", categoryUr: "عمومی اصول", titleEn: "42) Grandfather vs Siblings", titleUr: "42) دادا اور بھائی", contentEn: "Difference of opinion on grandfather blocking siblings.", contentUr: "دادا اور بہن بھائیوں میں اختلاف۔" },
    { id: "43", categoryEn: "General Principles", categoryUr: "عمومی اصول", titleEn: "43) No Ta'seeb for 7", titleUr: "43) عصبہ سے استثنیٰ", contentEn: "Mother, Grandmothers, Spouses, Maternals don't get Ta'seeb.", contentUr: "وہ وارث جو عصبہ نہیں بنتے۔" },
    { id: "44", categoryEn: "Ta'seeb", categoryUr: "تعصیب", titleEn: "44) Joint Ta'seeb cases", titleUr: "44) مشترکہ تعصیب", contentEn: "Daughter, Sister, Paternal Sister, Granddaughter.", contentUr: "مشترکہ تعصیب کی صورتیں۔" }
];
