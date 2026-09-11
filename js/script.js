/* =========================================================
   ATCRS — AUTOMATED TRANSCRIPT AND CREDENTIAL
   RETRIEVAL SYSTEM

   PART 18A
   CORE DATA + HELPERS + PAGE PROTECTION
   ========================================================= */


/* =========================================================
   STORAGE KEYS
   ========================================================= */

const ATCRS_KEYS = {

    studentAccount: "atcrsStudentAccount",

    studentSession: "atcrsStudentSession",

    registrarSession: "atcrsRegistrarSession",

    requests: "atcrsRequests",

    payments: "atcrsPayments",

    clearance: "atcrsClearance",

    documents: "atcrsDocuments"

};


/* =========================================================
   DEMO REGISTRAR ACCOUNT
   PROTOTYPE ONLY
   ========================================================= */

const REGISTRAR_ACCOUNT = {

    email: "registrar@dlsjbc.edu.ph",

    password: "Registrar123",

    name: "Registrar"

};


/* =========================================================
   DOCUMENT TYPES
   ========================================================= */

const DOCUMENT_TYPES = [

    "School Background / School Records",

    "Transcript of Records (TOR)",

    "Diploma",

    "Certificate of Good Moral Character",

    "Certificate of Enrollment",

    "Certificate of Graduation",

    "Other School Document",

    "Credential Verification"

];


/* =========================================================
   EDUCATIONAL LEVELS
   ========================================================= */

const EDUCATION_LEVELS = [

    "Kindergarten",

    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",

    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",

    "Grade 11",
    "Grade 12",

    "College"

];


/* =========================================================
   COLLEGE COURSES
   ========================================================= */

const COLLEGE_COURSES = [

    "BSIT",

    "BSCS",

    "BSA",

    "BSBA",

    "BSHM",

    "BSTM",

    "BEED",

    "BSED"

];


/* =========================================================
   REQUEST STATUSES
   ========================================================= */

const REQUEST_STATUSES = [

    "Pending",

    "Payment Pending",

    "For Clearance",

    "Processing",

    "Approved",

    "Released",

    "Rejected"

];


/* =========================================================
   UTILITY — GET ELEMENT
   ========================================================= */

function getElement(id){

    return document.getElementById(id);

}


/* =========================================================
   UTILITY — GET ALL
   ========================================================= */

function getAll(selector){

    return document.querySelectorAll(selector);

}


/* =========================================================
   LOCAL STORAGE — GET
   ========================================================= */

function getStorage(key, fallback = null){

    try{

        const data = localStorage.getItem(key);

        if(data === null){

            return fallback;

        }

        return JSON.parse(data);

    }catch(error){

        console.error("ATCRS storage error:", error);

        return fallback;

    }

}


/* =========================================================
   LOCAL STORAGE — SET
   ========================================================= */

function setStorage(key, value){

    try{

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    }catch(error){

        console.error("ATCRS storage save error:", error);

        return false;

    }

}


/* =========================================================
   REMOVE STORAGE
   ========================================================= */

function removeStorage(key){

    localStorage.removeItem(key);

}


/* =========================================================
   CURRENT STUDENT
   ========================================================= */

function getStudent(){

    return getStorage(
        ATCRS_KEYS.studentAccount,
        null
    );

}


/* =========================================================
   CURRENT STUDENT SESSION
   ========================================================= */

function getStudentSession(){

    return getStorage(
        ATCRS_KEYS.studentSession,
        null
    );

}


/* =========================================================
   REGISTRAR SESSION
   ========================================================= */

function getRegistrarSession(){

    return getStorage(
        ATCRS_KEYS.registrarSession,
        null
    );

}


/* =========================================================
   GET CURRENT PAGE
   ========================================================= */

function getCurrentPage(){

    return window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

}


/* =========================================================
   IS STUDENT PAGE?
   ========================================================= */

function isStudentPage(){

    return window.location.pathname
        .toLowerCase()
        .includes("/user/");

}


/* =========================================================
   IS REGISTRAR PAGE?
   ========================================================= */

function isRegistrarPage(){

    return window.location.pathname
        .toLowerCase()
        .includes("/registrar/");

}


/* =========================================================
   REDIRECT
   ========================================================= */

function redirectTo(path){

    window.location.href = path;

}


/* =========================================================
   PAGE PROTECTION
   ========================================================= */

function protectPages(){

    const page = getCurrentPage();

    const studentSession = getStudentSession();

    const registrarSession = getRegistrarSession();


    /* -----------------------------------------------------
       STUDENT AREA
       ----------------------------------------------------- */

    if(isStudentPage()){

        if(page !== "login.html" && !studentSession){

            redirectTo("../login.html");

            return;

        }

    }


    /* -----------------------------------------------------
       REGISTRAR AREA
       ----------------------------------------------------- */

    if(isRegistrarPage()){

        if(
            page !== "login.html" &&
            !registrarSession
        ){

            redirectTo("login.html");

            return;

        }

    }

}


/* =========================================================
   GENERATE ID
   ========================================================= */

function generateId(prefix){

    const now = Date.now()
        .toString()
        .slice(-8);

    const random = Math.floor(
        Math.random() * 900
    ) + 100;

    return `${prefix}-${now}-${random}`;

}


/* =========================================================
   CURRENT DATE
   ========================================================= */

function formatDate(dateValue){

    if(!dateValue){

        return "—";

    }

    const date = new Date(dateValue);

    if(Number.isNaN(date.getTime())){

        return "—";

    }

    return date.toLocaleDateString(
        "en-PH",
        {
            year:"numeric",
            month:"short",
            day:"numeric"
        }
    );

}


/* =========================================================
   CURRENT DATE + TIME
   ========================================================= */

function formatDateTime(dateValue){

    if(!dateValue){

        return "—";

    }

    const date = new Date(dateValue);

    if(Number.isNaN(date.getTime())){

        return "—";

    }

    return date.toLocaleString(
        "en-PH",
        {
            year:"numeric",
            month:"short",
            day:"numeric",
            hour:"numeric",
            minute:"2-digit"
        }
    );

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value){

    if(value === null || value === undefined){

        return "";

    }

    return String(value)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}


/* =========================================================
   SHOW MESSAGE
   ========================================================= */

function showMessage(
    element,
    message,
    type = "info"
){

    if(!element){

        return;

    }

    element.textContent = message;

    element.className =
        `form-message ${type}`;

    element.style.display = "block";

}


/* =========================================================
   HIDE MESSAGE
   ========================================================= */

function hideMessage(element){

    if(!element){

        return;

    }

    element.style.display = "none";

}


/* =========================================================
   STATUS CLASS
   ========================================================= */

function statusClass(status){

    const value =
        String(status || "")
        .toLowerCase();

    if(value.includes("released")){

        return "released";

    }

    if(value.includes("approved")){

        return "approved";

    }

    if(value.includes("processing")){

        return "processing";

    }

    if(value.includes("rejected")){

        return "rejected";

    }

    return "pending";

}


/* =========================================================
   STATUS BADGE
   ========================================================= */

function statusBadge(status){

    return `
        <span class="status-badge ${statusClass(status)}">
            ${escapeHTML(status || "Pending")}
        </span>
    `;

}


/* =========================================================
   START APPLICATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        protectPages();

        initializeATCRS();

    }
);
/* =========================================================
   PART 18B
   STUDENT REGISTRATION + LOGIN
   ========================================================= */


/* =========================================================
   STUDENT REGISTRATION
   ========================================================= */

function initializeStudentRegistration(){

    const form =
        getElement("studentRegisterForm");

    if(!form){

        return;

    }


    const educationLevel =
        getElement("educationLevel");

    const courseGroup =
        getElement("courseGroup");

    const collegeCourse =
        getElement("collegeCourse");

    const message =
        getElement("registerMessage");


    /* -----------------------------------------------------
       SHOW / HIDE COLLEGE COURSE
       ----------------------------------------------------- */

    function updateCourseVisibility(){

        if(!educationLevel || !courseGroup){

            return;

        }

        if(
            educationLevel.value === "College"
        ){

            courseGroup.style.display = "block";

            if(collegeCourse){

                collegeCourse.required = true;

            }

        }else{

            courseGroup.style.display = "none";

            if(collegeCourse){

                collegeCourse.required = false;

                collegeCourse.value = "";

            }

        }

    }


    if(educationLevel){

        educationLevel.addEventListener(
            "change",
            updateCourseVisibility
        );

        updateCourseVisibility();

    }


    /* -----------------------------------------------------
       SUBMIT REGISTRATION
       ----------------------------------------------------- */

    form.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const email =
                getElement("registerEmail")?.value
                .trim();

            const fullName =
                getElement("fullName")?.value
                .trim();

            const studentId =
                getElement("studentId")?.value
                .trim();

            const password =
                getElement("registerPassword")?.value
                || "";

            const confirmPassword =
                getElement("confirmPassword")?.value
                || "";

            const agreeTerms =
                getElement("agreeTerms")?.checked
                || false;


            const education =
                educationLevel?.value
                || "";

            const course =
                collegeCourse?.value
                || "";


            /* -------------------------------------------------
               REQUIRED FIELDS
               ------------------------------------------------- */

            if(
                !email ||
                !fullName ||
                !studentId ||
                !education ||
                !password ||
                !confirmPassword
            ){

                showMessage(
                    message,
                    "Please complete all required fields.",
                    "error"
                );

                return;

            }


            /* -------------------------------------------------
               EMAIL
               ------------------------------------------------- */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if(!emailPattern.test(email)){

                showMessage(
                    message,
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }


            /* -------------------------------------------------
               FULL NAME 10–20 CHARACTERS
               ------------------------------------------------- */

            if(
                fullName.length < 10 ||
                fullName.length > 20
            ){

                showMessage(
                    message,
                    "Full Name must contain 10 to 20 characters.",
                    "error"
                );

                return;

            }


            /* -------------------------------------------------
               STUDENT ID — EXACTLY 7 DIGITS
               ------------------------------------------------- */

            if(!/^\d{7}$/.test(studentId)){

                showMessage(
                    message,
                    "Student ID must contain exactly 7 digits.",
                    "error"
                );

                return;

            }


            /* -------------------------------------------------
               COLLEGE COURSE
               ------------------------------------------------- */

            if(
                education === "College" &&
                !course
            ){

                showMessage(
                    message,
                    "Please select your College Course / Program.",
                    "error"
                );

                return;

            }


            /* -------------------------------------------------
               PASSWORD
               ------------------------------------------------- */

            if(password.length < 8){

                showMessage(
                    message,
                    "Password must contain at least 8 characters.",
                    "error"
                );

                return;

            }


            /* -------------------------------------------------
               CONFIRM PASSWORD
               ------------------------------------------------- */

            if(password !== confirmPassword){

                showMessage(
                    message,
                    "Passwords do not match.",
                    "error"
                );

                return;

            }


            /* -------------------------------------------------
               TERMS
               ------------------------------------------------- */

            if(!agreeTerms){

                showMessage(
                    message,
                    "You must agree to the Terms of Use and Policy.",
                    "error"
                );

                return;

            }


            /* -------------------------------------------------
               EXISTING ACCOUNT
               ------------------------------------------------- */

            const existingAccount =
                getStudent();


            if(existingAccount){

                if(
                    existingAccount.email
                        .toLowerCase() ===
                    email.toLowerCase()
                ){

                    showMessage(
                        message,
                        "An account with this email already exists.",
                        "error"
                    );

                    return;

                }


                if(
                    existingAccount.studentId ===
                    studentId
                ){

                    showMessage(
                        message,
                        "An account with this Student ID already exists.",
                        "error"
                    );

                    return;

                }

            }


            /* -------------------------------------------------
               CREATE ACCOUNT
               ------------------------------------------------- */

            const account = {

                email:email,

                fullName:fullName,

                studentId:studentId,

                educationLevel:education,

                collegeCourse:
                    education === "College"
                        ? course
                        : "",

                password:password,

                createdAt:
                    new Date().toISOString()

            };


            setStorage(
                ATCRS_KEYS.studentAccount,
                account
            );


            /* -------------------------------------------------
               INITIAL CLEARANCE
               ------------------------------------------------- */

            setStorage(
                ATCRS_KEYS.clearance,
                []
            );


            /* -------------------------------------------------
               SUCCESS
               ------------------------------------------------- */

            showMessage(
                message,
                "Account created successfully. You may now log in.",
                "success"
            );


            form.reset();

            updateCourseVisibility();


            setTimeout(
                function(){

                    const loginEmail =
                        getElement("loginEmail");

                    if(loginEmail){

                        loginEmail.value = email;

                    }

                },
                300
            );

        }
    );

}


/* =========================================================
   STUDENT LOGIN
   ========================================================= */

function initializeStudentLogin(){

    const form =
        getElement("studentLoginForm");

    if(!form){

        return;

    }


    const message =
        getElement("loginMessage");


    form.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const email =
                getElement("loginEmail")?.value
                .trim();

            const studentId =
                getElement("loginStudentId")?.value
                .trim();

            const password =
                getElement("loginPassword")?.value
                || "";


            if(!email || !studentId || !password){

                showMessage(
                    message,
                    "Please enter your email, Student ID, and password.",
                    "error"
                );

                return;

            }


            if(!/^\d{7}$/.test(studentId)){

                showMessage(
                    message,
                    "Student ID must contain exactly 7 digits.",
                    "error"
                );

                return;

            }


            const account =
                getStudent();


            if(!account){

                showMessage(
                    message,
                    "No Student account was found. Please create an account first.",
                    "error"
                );

                return;

            }


            if(
                account.email.toLowerCase() !==
                email.toLowerCase() ||
                account.studentId !== studentId ||
                account.password !== password
            ){

                showMessage(
                    message,
                    "Incorrect email, Student ID, or password.",
                    "error"
                );

                return;

            }


            /* -------------------------------------------------
               CREATE STUDENT SESSION
               ------------------------------------------------- */

            setStorage(
                ATCRS_KEYS.studentSession,
                {
                    email:account.email,

                    studentId:account.studentId,

                    loginAt:
                        new Date().toISOString()
                }
            );


            showMessage(
                message,
                "Login successful. Opening Student Dashboard...",
                "success"
            );


            setTimeout(
                function(){

                    redirectTo(
                        "user/dashboard.html"
                    );

                },
                500
            );

        }
    );

}


/* =========================================================
   PASSWORD TOGGLE
   ========================================================= */

function initializePasswordToggles(){

    const toggles =
        getAll(".password-toggle");


    toggles.forEach(
        function(button){

            button.addEventListener(
                "click",
                function(){

                    const targetId =
                        button.dataset.target;

                    const input =
                        getElement(targetId);

                    if(!input){

                        return;

                    }


                    if(input.type === "password"){

                        input.type = "text";

                        button.innerHTML =
                            '<i class="fa-solid fa-eye-slash"></i>';

                    }else{

                        input.type = "password";

                        button.innerHTML =
                            '<i class="fa-solid fa-eye"></i>';

                    }

                }
            );

        }
    );

            }

/* =========================================================
   PART 18C
   REGISTRAR LOGIN + LOGOUT
   ========================================================= */


/* =========================================================
   REGISTRAR LOGIN
   ========================================================= */

function initializeRegistrarLogin(){

    const form =
        getElement("registrarLoginForm");

    if(!form){

        return;

    }


    const message =
        getElement("registrarLoginMessage");


    form.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const email =
                getElement("registrarEmail")?.value
                .trim()
                .toLowerCase();

            const password =
                getElement("registrarPassword")?.value
                || "";


            if(!email || !password){

                showMessage(
                    message,
                    "Please enter your Registrar email and password.",
                    "error"
                );

                return;

            }


            if(
                email !==
                REGISTRAR_ACCOUNT.email.toLowerCase() ||
                password !==
                REGISTRAR_ACCOUNT.password
            ){

                showMessage(
                    message,
                    "Incorrect Registrar email or password.",
                    "error"
                );

                return;

            }


            /* -------------------------------------------------
               REGISTRAR SESSION
               ------------------------------------------------- */

            setStorage(
                ATCRS_KEYS.registrarSession,
                {

                    email:
                        REGISTRAR_ACCOUNT.email,

                    name:
                        REGISTRAR_ACCOUNT.name,

                    loginAt:
                        new Date().toISOString()

                }
            );


            showMessage(
                message,
                "Login successful. Opening Registrar Dashboard...",
                "success"
            );


            setTimeout(
                function(){

                    redirectTo(
                        "dashboard.html"
                    );

                },
                500
            );

        }
    );

}


/* =========================================================
   STUDENT LOGOUT
   ========================================================= */

function initializeStudentLogout(){

    const button =
        getElement("studentLogoutBtn");

    if(!button){

        return;

    }


    button.addEventListener(
        "click",
        function(){

            removeStorage(
                ATCRS_KEYS.studentSession
            );


            window.location.href =
                "../login.html";

        }
    );

}


/* =========================================================
   REGISTRAR LOGOUT
   ========================================================= */

function initializeRegistrarLogout(){

    const button =
        getElement("registrarLogoutBtn");

    if(!button){

        return;

    }


    button.addEventListener(
        "click",
        function(){

            removeStorage(
                ATCRS_KEYS.registrarSession
            );


            window.location.href =
                "login.html";

        }
    );

}


/* =========================================================
   LOAD STUDENT NAME
   ========================================================= */

function loadStudentNames(){

    const student =
        getStudent();


    if(!student){

        return;

    }


    const nameElements = [

        "dashboardStudentName",

        "sidebarStudentName",

        "welcomeStudentName",

        "profileHeaderName",

        "requestHeaderName",

        "documentsHeaderName",

        "documentsStudentName"

    ];


    nameElements.forEach(
        function(id){

            const element =
                getElement(id);

            if(element){

                element.textContent =
                    student.fullName;

            }

        }
    );

}


/* =========================================================
   LOAD REGISTRAR DATE
   ========================================================= */

function loadRegistrarDate(){

    const element =
        getElement("registrarCurrentDate");

    if(!element){

        return;

    }


    element.textContent =
        new Date().toLocaleDateString(
            "en-PH",
            {
                year:"numeric",
                month:"long",
                day:"numeric"
            }
        );

    }
/* =========================================================
   PART 18D
   STUDENT PROFILE + DASHBOARD
   ========================================================= */


/* =========================================================
   LOAD PROFILE
   ========================================================= */

function initializeProfilePage(){

    const form =
        getElement("profileForm");

    if(!form){

        return;

    }


    const student =
        getStudent();


    if(!student){

        return;

    }


    const email =
        getElement("profileEmail");

    const fullName =
        getElement("profileFullName");

    const studentId =
        getElement("profileStudentId");

    const education =
        getElement("profileEducationLevel");

    const courseGroup =
        getElement("profileCourseGroup");

    const course =
        getElement("profileCollegeCourse");

    const accountCreated =
        getElement("accountCreatedDate");

    const accountStudentId =
        getElement("accountStudentId");


    if(email){

        email.value =
            student.email || "";

    }


    if(fullName){

        fullName.value =
            student.fullName || "";

    }


    if(studentId){

        studentId.value =
            student.studentId || "";

    }


    if(education){

        education.value =
            student.educationLevel || "";

    }


    if(course){

        course.value =
            student.collegeCourse || "";

    }


    if(accountCreated){

        accountCreated.textContent =
            formatDate(student.createdAt);

    }


    if(accountStudentId){

        accountStudentId.textContent =
            student.studentId || "—";

    }


    function updateProfileCourse(){

        if(
            education &&
            education.value === "College"
        ){

            if(courseGroup){

                courseGroup.style.display =
                    "block";

            }

        }else{

            if(courseGroup){

                courseGroup.style.display =
                    "none";

            }

        }

    }


    if(education){

        education.addEventListener(
            "change",
            updateProfileCourse
        );

    }


    updateProfileCourse();


    /* -----------------------------------------------------
       SAVE PROFILE
       ----------------------------------------------------- */

    form.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const message =
                getElement("profileMessage");


            const newFullName =
                fullName?.value.trim()
                || "";

            const newEducation =
                education?.value
                || "";

            const newCourse =
                course?.value
                || "";


            if(
                newFullName.length < 30 ||
                newFullName.length > 50
            ){

                showMessage(
                    message,
                    "Full Name must contain 30 to 50 characters.",
                    "error"
                );

                return;

            }


            if(!/^\d{7}$/.test(studentId.value)){

                showMessage(
                    message,
                    "Student ID must contain exactly 7 digits.",
                    "error"
                );

                return;

            }


            if(
                newEducation === "College" &&
                !newCourse
            ){

                showMessage(
                    message,
                    "Please select your College Course / Program.",
                    "error"
                );

                return;

            }


            const updatedStudent = {

                ...student,

                fullName:newFullName,

                educationLevel:newEducation,

                collegeCourse:
                    newEducation === "College"
                        ? newCourse
                        : ""

            };


            setStorage(
                ATCRS_KEYS.studentAccount,
                updatedStudent
            );


            showMessage(
                message,
                "Profile information updated successfully.",
                "success"
            );


            loadStudentNames();

        }
    );

}


/* =========================================================
   GET STUDENT REQUESTS
   ========================================================= */

function getStudentRequests(){

    const student =
        getStudent();


    if(!student){

        return [];

    }


    const requests =
        getStorage(
            ATCRS_KEYS.requests,
            []
        );


    return requests.filter(
        function(request){

            return request.studentId ===
                student.studentId;

        }
    );

}


/* =========================================================
   STUDENT DASHBOARD
   ========================================================= */

function initializeStudentDashboard(){

    if(!getElement("totalRequests")){

        return;

    }


    const requests =
        getStudentRequests();


    const total =
        requests.length;


    const pending =
        requests.filter(
            request =>
                [
                    "Pending",
                    "Payment Pending",
                    "For Clearance"
                ].includes(request.status)
        ).length;


    const processing =
        requests.filter(
            request =>
                [
                    "Processing",
                    "Approved"
                ].includes(request.status)
        ).length;


    const released =
        requests.filter(
            request =>
                request.status === "Released"
        ).length;


    const values = {

        totalRequests:total,

        pendingRequests:pending,

        processingRequests:processing,

        releasedRequests:released

    };


    Object.entries(values).forEach(
        function([id,value]){

            const element =
                getElement(id);

            if(element){

                element.textContent =
                    value;

            }

        }
    );


    renderLatestStudentRequest(
        requests
    );


    renderStudentClearanceSummary(
        requests
    );

}


/* =========================================================
   LATEST REQUEST
   ========================================================= */

function renderLatestStudentRequest(requests){

    const container =
        getElement("latestRequestContainer");

    if(!container){

        return;

    }


    if(!requests.length){

        container.innerHTML = `

            <div class="empty-content">

                <i class="fa-solid fa-file-circle-plus"></i>

                <h3>No Requests Yet</h3>

                <p>
                    You have not submitted a document request.
                </p>

            </div>

        `;

        return;

    }


    const latest =
        [...requests]
        .sort(
            (a,b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        )[0];


    container.innerHTML = `

        <div class="student-profile-summary">

            <div class="student-profile-avatar">

                <i class="fa-solid fa-file-lines"></i>

            </div>

            <div>

                <h3>
                    ${escapeHTML(latest.documentType)}
                </h3>

                <p>
                    Request ID:
                    ${escapeHTML(latest.requestId)}
                </p>

                <p>
                    ${formatDate(latest.createdAt)}
                </p>

            </div>

            <div>

                ${statusBadge(latest.status)}

            </div>

        </div>

    `;

}


/* =========================================================
   STUDENT CLEARANCE SUMMARY
   ========================================================= */

function renderStudentClearanceSummary(requests){

    const latest =
        [...requests]
        .sort(
            (a,b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        )[0];


    if(!latest){

        return;

    }


    const clearanceRecords =
        getStorage(
            ATCRS_KEYS.clearance,
            []
        );


    const record =
        clearanceRecords.find(
            item =>
                item.requestId ===
                latest.requestId
        );


    const clearance =
        record || {

            overallStatus:"Pending",

            registrarReview:"Pending",

            financialStatus:"Pending",

            libraryStatus:"Pending"

        };


    const fields = {

        clearanceStatus:
            clearance.overallStatus,

        registrarReviewStatus:
            clearance.registrarReview,

        financialClearanceStatus:
            clearance.financialStatus,

        libraryClearanceStatus:
            clearance.libraryStatus

    };


    Object.entries(fields).forEach(
        function([id,value]){

            const element =
                getElement(id);

            if(element){

                element.innerHTML =
                    statusBadge(value);

            }

        }
    );


    const message =
        getElement("clearanceMessage");


    if(message){

        message.textContent =
            clearance.overallStatus === "Cleared"
                ? "Your clearance has been completed."
                : "Your request is still undergoing clearance checking.";

    }

      }
/* =========================================================
   PART 18E
   STUDENT DOCUMENT REQUEST
   ========================================================= */


/* =========================================================
   REQUEST PAGE
   ========================================================= */

function initializeRequestPage(){

    const form =
        getElement("documentRequestForm");

    if(!form){

        return;

    }


    const student =
        getStudent();


    if(!student){

        return;

    }


    const documentType =
        getElement("documentType");

    const purpose =
        getElement("requestPurpose");

    const otherPurposeGroup =
        getElement("otherPurposeGroup");

    const otherPurpose =
        getElement("otherPurpose");

    const copies =
        getElement("numberOfCopies");

    const details =
        getElement("requestDetails");

    const releaseMethod =
        getElement("releaseMethod");

    const releaseEmail =
        getElement("releaseEmail");

    const agreement =
        getElement("requestAgreement");

    const message =
        getElement("requestMessage");


    /* -----------------------------------------------------
       PURPOSE — OTHER
       ----------------------------------------------------- */

    function updateOtherPurpose(){

        if(!purpose || !otherPurposeGroup){

            return;

        }


        if(purpose.value === "Other"){

            otherPurposeGroup.style.display =
                "block";

            if(otherPurpose){

                otherPurpose.required = true;

            }

        }else{

            otherPurposeGroup.style.display =
                "none";

            if(otherPurpose){

                otherPurpose.required = false;

                otherPurpose.value = "";

            }

        }

    }


    if(purpose){

        purpose.addEventListener(
            "change",
            updateOtherPurpose
        );

    }


    updateOtherPurpose();


    /* -----------------------------------------------------
       RELEASE EMAIL
       ----------------------------------------------------- */

    function updateReleaseEmail(){

        if(
            !releaseMethod ||
            !releaseEmail
        ){

            return;

        }


        if(
            releaseMethod.value ===
            "Email"
        ){

            releaseEmail.parentElement.style.display =
                "block";

            releaseEmail.required = true;

            if(!releaseEmail.value){

                releaseEmail.value =
                    student.email || "";

            }

        }else{

            releaseEmail.parentElement.style.display =
                "none";

            releaseEmail.required = false;

        }

    }


    if(releaseMethod){

        releaseMethod.addEventListener(
            "change",
            updateReleaseEmail
        );

    }


    updateReleaseEmail();


    /* -----------------------------------------------------
       LIVE REVIEW
       ----------------------------------------------------- */

    function updateRequestReview(){

        const values = {

            reviewDocument:
                documentType?.value || "—",

            reviewPurpose:
                purpose?.value === "Other"
                    ? (
                        otherPurpose?.value ||
                        "Other"
                    )
                    : (
                        purpose?.value ||
                        "—"
                    ),

            reviewCopies:
                copies?.value || "1",

            reviewRelease:
                releaseMethod?.value || "—"

        };


        Object.entries(values).forEach(
            function([id,value]){

                const element =
                    getElement(id);

                if(element){

                    element.textContent =
                        value;

                }

            }
        );

    }


    [
        documentType,
        purpose,
        otherPurpose,
        copies,
        releaseMethod
    ].forEach(
        function(element){

            if(element){

                element.addEventListener(
                    "input",
                    updateRequestReview
                );

                element.addEventListener(
                    "change",
                    updateRequestReview
                );

            }

        }
    );


    updateRequestReview();


    /* -----------------------------------------------------
       SUBMIT REQUEST
       ----------------------------------------------------- */

    form.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            if(!documentType.value){

                showMessage(
                    message,
                    "Please select a document type.",
                    "error"
                );

                return;

            }


            if(!purpose.value){

                showMessage(
                    message,
                    "Please select the purpose of your request.",
                    "error"
                );

                return;

            }


            if(
                purpose.value === "Other" &&
                !otherPurpose.value.trim()
            ){

                showMessage(
                    message,
                    "Please specify your purpose.",
                    "error"
                );

                return;

            }


            if(!releaseMethod.value){

                showMessage(
                    message,
                    "Please select a release method.",
                    "error"
                );

                return;

            }


            if(
                releaseMethod.value === "Email" &&
                !releaseEmail.value.trim()
            ){

                showMessage(
                    message,
                    "Please provide the release email address.",
                    "error"
                );

                return;

            }


            if(
                agreement &&
                !agreement.checked
            ){

                showMessage(
                    message,
                    "Please confirm the request information before submitting.",
                    "error"
                );

                return;

            }


            const requests =
                getStorage(
                    ATCRS_KEYS.requests,
                    []
                );


            const requestId =
                generateId("REQ");


            const finalPurpose =
                purpose.value === "Other"
                    ? otherPurpose.value.trim()
                    : purpose.value;


            const request = {

                requestId:requestId,

                studentId:
                    student.studentId,

                studentName:
                    student.fullName,

                email:
                    student.email,

                educationLevel:
                    student.educationLevel,

                collegeCourse:
                    student.collegeCourse || "",

                documentType:
                    documentType.value,

                purpose:
                    finalPurpose,

                copies:
                    Number(copies.value || 1),

                details:
                    details?.value.trim() || "",

                releaseMethod:
                    releaseMethod.value,

                releaseEmail:
                    releaseEmail?.value.trim() || "",

                status:"Payment Pending",

                paymentStatus:"Pending",

                clearanceStatus:"Pending",

                processingStatus:"Pending",

                notes:"",

                createdAt:
                    new Date().toISOString(),

                updatedAt:
                    new Date().toISOString()

            };


            requests.push(request);


            setStorage(
                ATCRS_KEYS.requests,
                requests
            );


            /* -------------------------------------------------
               CREATE CLEARANCE RECORD
               ------------------------------------------------- */

            const clearance =
                getStorage(
                    ATCRS_KEYS.clearance,
                    []
                );


            clearance.push({

                requestId:requestId,

                studentId:
                    student.studentId,

                studentName:
                    student.fullName,

                registrarReview:"Pending",

                financialStatus:"Pending",

                libraryStatus:"Pending",

                overallStatus:"Pending",

                notes:"",

                updatedAt:
                    new Date().toISOString()

            });


            setStorage(
                ATCRS_KEYS.clearance,
                clearance
            );


            /* -------------------------------------------------
               SUCCESS
               ------------------------------------------------- */

            showMessage(
                message,
                `Request submitted successfully. Your Request ID is ${requestId}.`,
                "success"
            );


            form.reset();

            updateOtherPurpose();

            updateReleaseEmail();

            updateRequestReview();


            setTimeout(
                function(){

                    window.location.href =
                        "payment.html";

                },
                1000
            );

        }
    );

              }
/* =========================================================
   PART 18F
   STUDENT PAYMENT
   ========================================================= */


/* =========================================================
   PAYMENT AMOUNT
   ========================================================= */

function calculateDocumentAmount(documentType){

    const prices = {

        "School Background / School Records":150,

        "Transcript of Records (TOR)":250,

        "Diploma":200,

        "Certificate of Good Moral Character":150,

        "Certificate of Enrollment":100,

        "Certificate of Graduation":150,

        "Other School Document":150,

        "Credential Verification":100

    };


    return prices[documentType] || 150;

}


/* =========================================================
   STUDENT PAYMENT PAGE
   ========================================================= */

function initializePaymentPage(){

    const form =
        getElement("paymentForm");

    if(!form){

        return;

    }


    const requests =
        getStudentRequests();


    const pendingRequests =
        requests.filter(
            request =>
                request.paymentStatus !== "Paid" &&
                request.status !== "Released"
        );


    const requestSelect =
        getElement("paymentRequestSelect");


    /* -----------------------------------------------------
       LOAD REQUEST SELECT
       ----------------------------------------------------- */

    if(requestSelect){

        requestSelect.innerHTML = `

            <option value="">
                Select a Request
            </option>

        `;


        pendingRequests.forEach(
            function(request){

                const option =
                    document.createElement("option");

                option.value =
                    request.requestId;

                option.textContent =
                    `${request.requestId} — ${request.documentType}`;

                requestSelect.appendChild(option);

            }
        );

    }


    /* -----------------------------------------------------
       FIND SELECTED REQUEST
       ----------------------------------------------------- */

    function getSelectedRequest(){

        if(!requestSelect){

            return null;

        }


        return pendingRequests.find(
            request =>
                request.requestId ===
                requestSelect.value
        ) || null;

    }


    /* -----------------------------------------------------
       UPDATE PAYMENT SUMMARY
       ----------------------------------------------------- */

    function updatePaymentSummary(){

        const request =
            getSelectedRequest();


        const fields = {

            paymentDocumentName:
                request?.documentType || "—",

            paymentRequestId:
                request?.requestId || "—",

            paymentStatus:
                request?.paymentStatus || "Pending",

            paymentQuantity:
                request?.copies || "—",

            paymentAmount:
                request
                    ? `₱${calculateDocumentAmount(request.documentType).toFixed(2)}`
                    : "₱0.00",

            paymentTotal:
                request
                    ? `₱${(
                        calculateDocumentAmount(
                            request.documentType
                        ) *
                        Number(request.copies || 1)
                    ).toFixed(2)}`
                    : "₱0.00"

        };


        Object.entries(fields).forEach(
            function([id,value]){

                const element =
                    getElement(id);

                if(element){

                    element.textContent =
                        value;

                }

            }
        );

    }


    if(requestSelect){

        requestSelect.addEventListener(
            "change",
            updatePaymentSummary
        );

    }


    updatePaymentSummary();


    /* -----------------------------------------------------
       SUBMIT PAYMENT
       ----------------------------------------------------- */

    form.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const request =
                getSelectedRequest();


            const message =
                getElement("paymentMessage");


            if(!request){

                showMessage(
                    message,
                    "Please select a request before continuing.",
                    "error"
                );

                return;

            }


            const method =
                document.querySelector(
                    'input[name="paymentMethod"]:checked'
                );


            if(!method){

                showMessage(
                    message,
                    "Please select a payment method.",
                    "error"
                );

                return;

            }


            const agreement =
                getElement("paymentAgreement");


            if(
                agreement &&
                !agreement.checked
            ){

                showMessage(
                    message,
                    "Please confirm the payment information.",
                    "error"
                );

                return;

            }


            /* -------------------------------------------------
               UPDATE REQUEST
               ------------------------------------------------- */

            const allRequests =
                getStorage(
                    ATCRS_KEYS.requests,
                    []
                );


            const requestIndex =
                allRequests.findIndex(
                    item =>
                        item.requestId ===
                        request.requestId
                );


            if(requestIndex === -1){

                showMessage(
                    message,
                    "The selected request could not be found.",
                    "error"
                );

                return;

            }


            const amount =
                calculateDocumentAmount(
                    request.documentType
                ) *
                Number(request.copies || 1);


            const reference =
                generateId("PAY");


            allRequests[requestIndex] = {

                ...allRequests[requestIndex],

                paymentStatus:"Paid",

                paymentReference:reference,

                paymentMethod:method.value,

                paymentAmount:amount,

                paymentDate:
                    new Date().toISOString(),

                status:"For Clearance",

                updatedAt:
                    new Date().toISOString()

            };


            setStorage(
                ATCRS_KEYS.requests,
                allRequests
            );


            /* -------------------------------------------------
               PAYMENT RECORD
               ------------------------------------------------- */

            const payments =
                getStorage(
                    ATCRS_KEYS.payments,
                    []
                );


            payments.push({

                paymentReference:reference,

                requestId:
                    request.requestId,

                studentId:
                    request.studentId,

                studentName:
                    request.studentName,

                email:
                    request.email,

                documentType:
                    request.documentType,

                copies:
                    request.copies,

                amount:amount,

                method:method.value,

                status:"Paid",

                date:
                    new Date().toISOString(),

                notes:""

            });


            setStorage(
                ATCRS_KEYS.payments,
                payments
            );


            /* -------------------------------------------------
               RECEIPT
               ------------------------------------------------- */

            const receipt =
                getElement("paymentReceipt");


            if(receipt){

                receipt.style.display =
                    "block";

            }


            const receiptFields = {

                receiptRequestId:
                    request.requestId,

                paymentReference:
                    reference,

                receiptAmount:
                    `₱${amount.toFixed(2)}`,

                receiptMethod:
                    method.value

            };


            Object.entries(receiptFields).forEach(
                function([id,value]){

                    const element =
                        getElement(id);

                    if(element){

                        element.textContent =
                            value;

                    }

                }
            );


            showMessage(
                message,
                "Payment recorded successfully.",
                "success"
            );


            updatePaymentSummary();

        }
    );

                               }

/* =========================================================
   PART 18G
   STUDENT DOCUMENTS + REQUEST HISTORY
   ========================================================= */


/* =========================================================
   STUDENT DOCUMENTS PAGE
   ========================================================= */

function initializeDocumentsPage(){

    const releasedContainer =
        getElement("releasedDocumentsContainer");


    const historyTable =
        getElement("documentRequestHistory");


    if(
        !releasedContainer &&
        !historyTable
    ){

        return;

    }


    const requests =
        getStudentRequests();


    const released =
        requests.filter(
            request =>
                request.status === "Released"
        );


    const processing =
        requests.filter(
            request =>
                [
                    "Processing",
                    "Approved"
                ].includes(request.status)
        );


    const pending =
        requests.filter(
            request =>
                [
                    "Pending",
                    "Payment Pending",
                    "For Clearance"
                ].includes(request.status)
        );


    const summary = {

        totalDocuments:
            requests.length,

        releasedDocuments:
            released.length,

        processingDocuments:
            processing.length,

        pendingDocuments:
            pending.length

    };


    Object.entries(summary).forEach(
        function([id,value]){

            const element =
                getElement(id);

            if(element){

                element.textContent =
                    value;

            }

        }
    );


    /* -----------------------------------------------------
       RELEASED DOCUMENTS
       ----------------------------------------------------- */

    if(releasedContainer){

        const noReleased =
            getElement("noReleasedDocuments");

        const list =
            getElement("releasedDocumentsList");


        if(!released.length){

            if(noReleased){

                noReleased.style.display =
                    "block";

            }

            if(list){

                list.innerHTML = "";

            }

        }else{

            if(noReleased){

                noReleased.style.display =
                    "none";

            }


            if(list){

                list.innerHTML =
                    released.map(
                        function(request){

                            return `

                                <div class="released-document">

                                    <div class="released-document-info">

                                        <div class="released-document-icon">

                                            <i class="fa-solid fa-file-circle-check"></i>

                                        </div>

                                        <div>

                                            <h3>
                                                ${escapeHTML(
                                                    request.documentType
                                                )}
                                            </h3>

                                            <p>
                                                Request ID:
                                                ${escapeHTML(
                                                    request.requestId
                                                )}
                                            </p>

                                            <p>
                                                Released:
                                                ${formatDate(
                                                    request.releaseDate
                                                )}
                                            </p>

                                        </div>

                                    </div>


                                    <div class="document-actions">

                                        <button
                                            type="button"
                                            class="btn btn-secondary"
                                            data-document-view="${escapeHTML(
                                                request.requestId
                                            )}"
                                        >

                                            <i class="fa-solid fa-eye"></i>

                                            View

                                        </button>


                                        <button
                                            type="button"
                                            class="btn btn-primary"
                                            data-document-download="${escapeHTML(
                                                request.requestId
                                            )}"
                                        >

                                            <i class="fa-solid fa-download"></i>

                                            Download

                                        </button>

                                    </div>

                                </div>

                            `;

                        }
                    )
                    .join("");

            }

        }

    }


    /* -----------------------------------------------------
       REQUEST HISTORY
       ----------------------------------------------------- */

    if(historyTable){

        if(!requests.length){

            historyTable.innerHTML = `

                <tr>

                    <td
                        colspan="7"
                        class="table-empty"
                    >

                        <i class="fa-solid fa-folder-open"></i>

                        No document requests found.

                    </td>

                </tr>

            `;

        }else{

            historyTable.innerHTML =
                requests
                .sort(
                    (a,b) =>
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                )
                .map(
                    function(request){

                        return `

                            <tr>

                                <td>
                                    ${escapeHTML(
                                        request.requestId
                                    )}
                                </td>

                                <td>
                                    ${escapeHTML(
                                        request.documentType
                                    )}
                                </td>

                                <td>
                                    ${formatDate(
                                        request.createdAt
                                    )}
                                </td>

                                <td>
                                    ${request.copies}
                                </td>

                                <td>
                                    ${statusBadge(
                                        request.paymentStatus
                                    )}
                                </td>

                                <td>
                                    ${statusBadge(
                                        request.clearanceStatus
                                    )}
                                </td>

                                <td>
                                    ${statusBadge(
                                        request.status
                                    )}
                                </td>

                            </tr>

                        `;

                    }
                )
                .join("");

        }

    }


    /* -----------------------------------------------------
       DOCUMENT DETAILS
       ----------------------------------------------------- */

    getAll(
        "[data-document-view]"
    ).forEach(
        function(button){

            button.addEventListener(
                "click",
                function(){

                    const requestId =
                        button.dataset.documentView;

                    showStudentDocumentDetails(
                        requestId
                    );

                }
            );

        }
    );


    getAll(
        "[data-document-download]"
    ).forEach(
        function(button){

            button.addEventListener(
                "click",
                function(){

                    const requestId =
                        button.dataset.documentDownload;

                    showStudentDocumentDetails(
                        requestId
                    );

                    alert(
                        "This prototype does not contain a real downloadable document file yet."
                    );

                }
            );

        }
    );


    const closeDetails =
        getElement("closeDocumentDetails");


    if(closeDetails){

        closeDetails.addEventListener(
            "click",
            function(){

                const card =
                    getElement("documentDetailsCard");

                if(card){

                    card.style.display =
                        "none";

                }

            }
        );

    }

}


/* =========================================================
   SHOW STUDENT DOCUMENT DETAILS
   ========================================================= */

function showStudentDocumentDetails(requestId){

    const request =
        getStudentRequests()
        .find(
            item =>
                item.requestId ===
                requestId
        );


    if(!request){

        return;

    }


    const card =
        getElement("documentDetailsCard");


    if(card){

        card.style.display =
            "block";

    }


    const fields = {

        detailsRequestId:
            request.requestId,

        detailsDocumentType:
            request.documentType,

        detailsPurpose:
            request.purpose,

        detailsCopies:
            request.copies,

        detailsRequestDate:
            formatDate(request.createdAt),

        detailsPaymentStatus:
            request.paymentStatus,

        detailsClearanceStatus:
            request.clearanceStatus,

        detailsProcessingStatus:
            request.status,

        detailsReleaseDate:
            formatDate(request.releaseDate)

    };


    Object.entries(fields).forEach(
        function([id,value]){

            const element =
                getElement(id);

            if(element){

                element.textContent =
                    value || "—";

            }

        }
    );


    const releaseInformation =
        getElement("releaseInformation");


    if(releaseInformation){

        releaseInformation.textContent =
            request.releaseMethod || "—";

    }

}
/* =========================================================
   PART 18H
   REGISTRAR DASHBOARD + STUDENTS
   ========================================================= */


/* =========================================================
   GET ALL DATA
   ========================================================= */

function getAllRequests(){

    return getStorage(
        ATCRS_KEYS.requests,
        []
    );

}


function getAllPayments(){

    return getStorage(
        ATCRS_KEYS.payments,
        []
    );

}


function getAllClearance(){

    return getStorage(
        ATCRS_KEYS.clearance,
        []
    );

}


/* =========================================================
   REGISTRAR DASHBOARD
   ========================================================= */

function initializeRegistrarDashboard(){

    if(!getElement("registrarTotalStudents")){

        return;

    }


    const student =
        getStudent();


    const requests =
        getAllRequests();


    const payments =
        getAllPayments();


    const clearance =
        getAllClearance();


    const totalStudents =
        student ? 1 : 0;


    const pendingRequests =
        requests.filter(
            request =>
                [
                    "Pending",
                    "Payment Pending",
                    "For Clearance"
                ].includes(request.status)
        ).length;


    const processingRequests =
        requests.filter(
            request =>
                [
                    "Processing",
                    "Approved"
                ].includes(request.status)
        ).length;


    const releasedDocuments =
        requests.filter(
            request =>
                request.status === "Released"
        ).length;


    const pendingPayments =
        requests.filter(
            request =>
                request.paymentStatus !== "Paid"
        ).length;


    const values = {

        registrarTotalStudents:
            totalStudents,

        registrarTotalRequests:
            requests.length,

        registrarPendingRequests:
            pendingRequests,

        registrarProcessingRequests:
            processingRequests,

        registrarReleasedDocuments:
            releasedDocuments,

        registrarPendingPayments:
            pendingPayments,

        overviewPending:
            requests.filter(
                r => r.status === "Pending"
            ).length,

        overviewPaymentPending:
            requests.filter(
                r => r.status === "Payment Pending"
            ).length,

        overviewClearance:
            requests.filter(
                r => r.status === "For Clearance"
            ).length,

        overviewProcessing:
            requests.filter(
                r => r.status === "Processing"
            ).length,

        overviewApproved:
            requests.filter(
                r => r.status === "Approved"
            ).length,

        overviewReleased:
            releasedDocuments

    };


    Object.entries(values).forEach(
        function([id,value]){

            const element =
                getElement(id);

            if(element){

                element.textContent =
                    value;

            }

        }
    );


    renderRegistrarRecentRequests(
        requests
    );

}


/* =========================================================
   REGISTRAR RECENT REQUESTS
   ========================================================= */

function renderRegistrarRecentRequests(
    requests
){

    const table =
        getElement("registrarRecentRequests");

    if(!table){

        return;

    }


    const latest =
        [...requests]
        .sort(
            (a,b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        )
        .slice(0,8);


    if(!latest.length){

        table.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="table-empty"
                >

                    <i class="fa-solid fa-inbox"></i>

                    No requests have been submitted yet.

                </td>

            </tr>

        `;

        return;

    }


    table.innerHTML =
        latest.map(
            function(request){

                return `

                    <tr>

                        <td>
                            ${escapeHTML(
                                request.requestId
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                request.studentName
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                request.documentType
                            )}
                        </td>

                        <td>
                            ${formatDate(
                                request.createdAt
                            )}
                        </td>

                        <td>
                            ${statusBadge(
                                request.status
                            )}
                        </td>

                        <td>

                            <button
                                class="table-action"
                                type="button"
                                data-request-view="${escapeHTML(
                                    request.requestId
                                )}"
                            >

                                <i class="fa-solid fa-eye"></i>

                                View

                            </button>

                        </td>

                    </tr>

                `;

            }
        )
        .join("");

}


/* =========================================================
   REGISTRAR STUDENTS PAGE
   ========================================================= */

function initializeRegistrarStudents(){

    const table =
        getElement("studentsTableBody");

    if(!table){

        return;

    }


    const student =
        getStudent();


    const requests =
        getAllRequests();


    const search =
        getElement("studentSearchInput");

    const educationFilter =
        getElement("studentEducationFilter");


    function render(){

        let students =
            student ? [student] : [];


        const searchValue =
            search?.value
            .trim()
            .toLowerCase()
            || "";


        const educationValue =
            educationFilter?.value
            || "";


        students =
            students.filter(
                function(item){

                    const matchesSearch =
                        !searchValue ||
                        item.fullName
                            .toLowerCase()
                            .includes(searchValue) ||
                        item.studentId
                            .includes(searchValue) ||
                        item.email
                            .toLowerCase()
                            .includes(searchValue);


                    const matchesEducation =
                        !educationValue ||
                        item.educationLevel ===
                        educationValue;


                    return (
                        matchesSearch &&
                        matchesEducation
                    );

                }
            );


        const total =
            student ? 1 : 0;


        const withRequests =
            student
                ? requests.filter(
                    r =>
                        r.studentId ===
                        student.studentId
                ).length
                    ? 1
                    : 0
                : 0;


        const values = {

            studentsTotalCount:
                total,

            studentsActiveCount:
                total,

            studentsWithRequestsCount:
                withRequests,

            recentStudentsCount:
                total,

            studentRecordCount:
                students.length

        };


        Object.entries(values).forEach(
            function([id,value]){

                const element =
                    getElement(id);

                if(element){

                    element.textContent =
                        value;

                }

            }
        );


        if(!students.length){

            table.innerHTML = `

                <tr>

                    <td
                        colspan="7"
                        class="table-empty"
                    >

                        <i class="fa-solid fa-user-slash"></i>

                        No student records found.

                    </td>

                </tr>

            `;

            return;

        }


        table.innerHTML =
            students.map(
                function(item){

                    const count =
                        requests.filter(
                            r =>
                                r.studentId ===
                                item.studentId
                        ).length;


                    return `

                        <tr>

                            <td>
                                ${escapeHTML(
                                    item.studentId
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    item.fullName
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    item.email
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    item.educationLevel
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    item.collegeCourse || "—"
                                )}
                            </td>

                            <td>
                                ${count}
                            </td>

                            <td>

                                <button
                                    type="button"
                                    class="table-action"
                                    data-student-view="${escapeHTML(
                                        item.studentId
                                    )}"
                                >

                                    <i class="fa-solid fa-eye"></i>

                                    View

                                </button>

                            </td>

                        </tr>

                    `;

                }
            )
            .join("");

    }


    if(search){

        search.addEventListener(
            "input",
            render
        );

    }


    if(educationFilter){

        educationFilter.addEventListener(
            "change",
            render
        );

    }


    const clearSearch =
        getElement("clearStudentSearch");


    if(clearSearch){

        clearSearch.addEventListener(
            "click",
            function(){

                if(search){

                    search.value = "";

                }

                render();

            }
        );

    }


    render();

}
/* =========================================================
   PART 18I
   REGISTRAR REQUEST MANAGEMENT
   ========================================================= */


/* =========================================================
   REGISTRAR REQUESTS PAGE
   ========================================================= */

function initializeRegistrarRequests(){

    const table =
        getElement("registrarRequestsTable");

    if(!table){

        return;

    }


    const search =
        getElement("requestSearchInput");

    const statusFilter =
        getElement("requestStatusFilter");

    const documentFilter =
        getElement("requestDocumentFilter");


    function render(){

        let requests =
            getAllRequests();


        const searchValue =
            search?.value
            .trim()
            .toLowerCase()
            || "";


        const statusValue =
            statusFilter?.value
            || "";


        const documentValue =
            documentFilter?.value
            || "";


        requests =
            requests.filter(
                function(request){

                    const matchesSearch =
                        !searchValue ||
                        request.requestId
                            .toLowerCase()
                            .includes(searchValue) ||
                        request.studentName
                            .toLowerCase()
                            .includes(searchValue) ||
                        request.studentId
                            .includes(searchValue);


                    const matchesStatus =
                        !statusValue ||
                        request.status ===
                        statusValue;


                    const matchesDocument =
                        !documentValue ||
                        request.documentType ===
                        documentValue;


                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesDocument
                    );

                }
            );


        const all =
            getAllRequests();


        const values = {

            requestsTotalCount:
                all.length,

            requestsPendingCount:
                all.filter(
                    r =>
                        [
                            "Pending",
                            "Payment Pending",
                            "For Clearance"
                        ].includes(r.status)
                ).length,

            requestsProcessingCount:
                all.filter(
                    r =>
                        [
                            "Processing",
                            "Approved"
                        ].includes(r.status)
                ).length,

            requestsReleasedCount:
                all.filter(
                    r =>
                        r.status ===
                        "Released"
                ).length,

            requestRecordCount:
                requests.length

        };


        Object.entries(values).forEach(
            function([id,value]){

                const element =
                    getElement(id);

                if(element){

                    element.textContent =
                        value;

                }

            }
        );


        if(!requests.length){

            table.innerHTML = `

                <tr>

                    <td
                        colspan="8"
                        class="table-empty"
                    >

                        <i class="fa-solid fa-folder-open"></i>

                        No requests found.

                    </td>

                </tr>

            `;

            return;

        }


        table.innerHTML =
            requests
            .sort(
                (a,b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            )
            .map(
                function(request){

                    return `

                        <tr>

                            <td>
                                ${escapeHTML(
                                    request.requestId
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    request.studentName
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    request.studentId
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    request.documentType
                                )}
                            </td>

                            <td>
                                ${formatDate(
                                    request.createdAt
                                )}
                            </td>

                            <td>
                                ${statusBadge(
                                    request.paymentStatus
                                )}
                            </td>

                            <td>
                                ${statusBadge(
                                    request.status
                                )}
                            </td>

                            <td>

                                <button
                                    type="button"
                                    class="table-action"
                                    data-registrar-request-view="${escapeHTML(
                                        request.requestId
                                    )}"
                                >

                                    <i class="fa-solid fa-eye"></i>

                                    View

                                </button>

                            </td>

                        </tr>

                    `;

                }
            )
            .join("");

    }


    if(search){

        search.addEventListener(
            "input",
            render
        );

    }


    if(statusFilter){

        statusFilter.addEventListener(
            "change",
            render
        );

    }


    if(documentFilter){

        documentFilter.addEventListener(
            "change",
            render
        );

    }


    const clearSearch =
        getElement("clearRequestSearch");


    if(clearSearch){

        clearSearch.addEventListener(
            "click",
            function(){

                if(search){

                    search.value = "";

                }

                render();

            }
        );

    }


    render();

}


/* =========================================================
   SHOW REGISTRAR REQUEST DETAILS
   ========================================================= */

function showRegistrarRequestDetails(
    requestId
){

    const request =
        getAllRequests()
        .find(
            item =>
                item.requestId ===
                requestId
        );


    if(!request){

        return;

    }


    const card =
        getElement("registrarRequestDetails");


    if(card){

        card.style.display =
            "block";

    }


    const fields = {

        registrarDetailsRequestId:
            request.requestId,

        registrarDetailsStudentName:
            request.studentName,

        registrarDetailsStudentId:
            request.studentId,

        registrarDetailsEmail:
            request.email,

        registrarDetailsDocument:
            request.documentType,

        registrarDetailsPurpose:
            request.purpose,

        registrarDetailsCopies:
            request.copies,

        registrarDetailsReleaseMethod:
            request.releaseMethod,

        registrarDetailsDate:
            formatDate(request.createdAt),

        registrarDetailsPayment:
            request.paymentStatus,

        registrarDetailsClearance:
            request.clearanceStatus,

        registrarDetailsStatus:
            request.status

    };


    Object.entries(fields).forEach(
        function([id,value]){

            const element =
                getElement(id);

            if(element){

                element.textContent =
                    value || "—";

            }

        }
    );


    const notes =
        getElement("registrarRequestNotes");


    if(notes){

        notes.value =
            request.notes || "";

    }


    const status =
        getElement("registrarRequestStatus");


    if(status){

        status.value =
            request.status || "Pending";

    }


    const message =
        getElement("registrarRequestMessage");


    if(message){

        hideMessage(message);

    }


    const saveNotes =
        getElement("saveRegistrarRequestNotes");


    if(saveNotes){

        saveNotes.onclick =
            function(){

                updateRegistrarRequest(
                    requestId,
                    null,
                    notes?.value || ""
                );

            };

    }


    const updateStatus =
        getElement("updateRegistrarRequestStatus");


    if(updateStatus){

        updateStatus.onclick =
            function(){

                updateRegistrarRequest(
                    requestId,
                    status?.value || "Pending",
                    notes?.value || ""
                );

            };

    }

}


/* =========================================================
   UPDATE REGISTRAR REQUEST
   ========================================================= */

function updateRegistrarRequest(
    requestId,
    newStatus = null,
    notes = ""
){

    const requests =
        getAllRequests();


    const index =
        requests.findIndex(
            request =>
                request.requestId ===
                requestId
        );


    if(index === -1){

        return;

    }


    const request =
        requests[index];


    if(newStatus){

        request.status =
            newStatus;

    }


    request.notes =
        notes;


    request.clearanceStatus =
        newStatus === "For Clearance"
            ? "Pending"
            : request.clearanceStatus;


    request.processingStatus =
        [
            "Processing",
            "Approved",
            "Released"
        ].includes(newStatus)
            ? newStatus
            : request.processingStatus;


    if(newStatus === "Released"){

        request.releaseDate =
            new Date().toISOString();

    }


    request.updatedAt =
        new Date().toISOString();


    requests[index] =
        request;


    setStorage(
        ATCRS_KEYS.requests,
        requests
    );


    const message =
        getElement("registrarRequestMessage");


    showMessage(
        message,
        "Request information updated successfully.",
        "success"
    );


    initializeRegistrarRequests();

          }
/* =========================================================
   PART 18J
   REGISTRAR PAYMENTS + CLEARANCE
   ========================================================= */


/* =========================================================
   REGISTRAR PAYMENTS
   ========================================================= */

function initializeRegistrarPayments(){

    const table =
        getElement("registrarPaymentsTable");

    if(!table){

        return;

    }


    const search =
        getElement("paymentSearchInput");

    const statusFilter =
        getElement("paymentStatusFilter");


    function render(){

        let payments =
            getAllPayments();


        const searchValue =
            search?.value
            .trim()
            .toLowerCase()
            || "";


        const statusValue =
            statusFilter?.value
            || "";


        payments =
            payments.filter(
                function(payment){

                    const matchesSearch =
                        !searchValue ||
                        payment.paymentReference
                            .toLowerCase()
                            .includes(searchValue) ||
                        payment.requestId
                            .toLowerCase()
                            .includes(searchValue) ||
                        payment.studentName
                            .toLowerCase()
                            .includes(searchValue) ||
                        payment.studentId
                            .includes(searchValue);


                    const matchesStatus =
                        !statusValue ||
                        payment.status ===
                        statusValue;


                    return (
                        matchesSearch &&
                        matchesStatus
                    );

                }
            );


        const all =
            getAllPayments();


        const totalAmount =
            all
            .filter(
                p =>
                    p.status === "Paid"
            )
            .reduce(
                (sum,p) =>
                    sum +
                    Number(p.amount || 0),
                0
            );


        const values = {

            paymentsTotalCount:
                all.length,

            paymentsPaidCount:
                all.filter(
                    p =>
                        p.status === "Paid"
                ).length,

            paymentsPendingCount:
                all.filter(
                    p =>
                        p.status !== "Paid"
                ).length,

            paymentsTotalAmount:
                `₱${totalAmount.toFixed(2)}`,

            paymentRecordCount:
                payments.length

        };


        Object.entries(values).forEach(
            function([id,value]){

                const element =
                    getElement(id);

                if(element){

                    element.textContent =
                        value;

                }

            }
        );


        if(!payments.length){

            table.innerHTML = `

                <tr>

                    <td
                        colspan="8"
                        class="table-empty"
                    >

                        <i class="fa-solid fa-money-check-dollar"></i>

                        No payment records found.

                    </td>

                </tr>

            `;

            return;

        }


        table.innerHTML =
            payments
            .sort(
                (a,b) =>
                    new Date(b.date) -
                    new Date(a.date)
            )
            .map(
                function(payment){

                    return `

                        <tr>

                            <td>
                                ${escapeHTML(
                                    payment.paymentReference
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    payment.studentName
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    payment.requestId
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    payment.documentType
                                )}
                            </td>

                            <td>
                                ₱${Number(
                                    payment.amount || 0
                                ).toFixed(2)}
                            </td>

                            <td>
                                ${escapeHTML(
                                    payment.method
                                )}
                            </td>

                            <td>
                                ${statusBadge(
                                    payment.status
                                )}
                            </td>

                            <td>

                                <button
                                    type="button"
                                    class="table-action"
                                    data-payment-view="${escapeHTML(
                                        payment.paymentReference
                                    )}"
                                >

                                    <i class="fa-solid fa-eye"></i>

                                    View

                                </button>

                            </td>

                        </tr>

                    `;

                }
            )
            .join("");

    }


    if(search){

        search.addEventListener(
            "input",
            render
        );

    }


    if(statusFilter){

        statusFilter.addEventListener(
            "change",
            render
        );

    }


    const clearSearch =
        getElement("clearPaymentSearch");


    if(clearSearch){

        clearSearch.addEventListener(
            "click",
            function(){

                if(search){

                    search.value = "";

                }

                render();

            }
        );

    }


    render();

}


/* =========================================================
   REGISTRAR CLEARANCE PAGE
   ========================================================= */

function initializeRegistrarClearance(){

    const table =
        getElement("registrarClearanceTable");

    if(!table){

        return;

    }


    const search =
        getElement("clearanceSearchInput");

    const statusFilter =
        getElement("clearanceStatusFilter");


    function render(){

        let records =
            getAllClearance();


        const searchValue =
            search?.value
            .trim()
            .toLowerCase()
            || "";


        const statusValue =
            statusFilter?.value
            || "";


        records =
            records.filter(
                function(record){

                    const matchesSearch =
                        !searchValue ||
                        record.studentName
                            .toLowerCase()
                            .includes(searchValue) ||
                        record.studentId
                            .includes(searchValue) ||
                        record.requestId
                            .toLowerCase()
                            .includes(searchValue);


                    const matchesStatus =
                        !statusValue ||
                        record.overallStatus ===
                        statusValue;


                    return (
                        matchesSearch &&
                        matchesStatus
                    );

                }
            );


        const all =
            getAllClearance();


        const values = {

            clearanceTotalCount:
                all.length,

            clearanceClearedCount:
                all.filter(
                    r =>
                        r.overallStatus ===
                        "Cleared"
                ).length,

            clearancePendingCount:
                all.filter(
                    r =>
                        r.overallStatus ===
                        "Pending"
                ).length,

            clearanceIssuesCount:
                all.filter(
                    r =>
                        r.overallStatus ===
                        "Issue"
                ).length,

            clearanceRecordCount:
                records.length

        };


        Object.entries(values).forEach(
            function([id,value]){

                const element =
                    getElement(id);

                if(element){

                    element.textContent =
                        value;

                }

            }
        );


        if(!records.length){

            table.innerHTML = `

                <tr>

                    <td
                        colspan="8"
                        class="table-empty"
                    >

                        <i class="fa-solid fa-clipboard-check"></i>

                        No clearance records found.

                    </td>

                </tr>

            `;

            return;

        }


        table.innerHTML =
            records
            .map(
                function(record){

                    return `

                        <tr>

                            <td>
                                ${escapeHTML(
                                    record.studentName
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.studentId
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.requestId
                                )}
                            </td>

                            <td>
                                ${statusBadge(
                                    record.registrarReview
                                )}
                            </td>

                            <td>
                                ${statusBadge(
                                    record.financialStatus
                                )}
                            </td>

                            <td>
                                ${statusBadge(
                                    record.libraryStatus
                                )}
                            </td>

                            <td>
                                ${statusBadge(
                                    record.overallStatus
                                )}
                            </td>

                            <td>

                                <button
                                    type="button"
                                    class="table-action"
                                    data-clearance-view="${escapeHTML(
                                        record.requestId
                                    )}"
                                >

                                    <i class="fa-solid fa-eye"></i>

                                    View

                                </button>

                            </td>

                        </tr>

                    `;

                }
            )
            .join("");

    }


    if(search){

        search.addEventListener(
            "input",
            render
        );

    }


    if(statusFilter){

        statusFilter.addEventListener(
            "change",
            render
        );

    }


    const clearSearch =
        getElement("clearClearanceSearch");


    if(clearSearch){

        clearSearch.addEventListener(
            "click",
            function(){

                if(search){

                    search.value = "";

                }

                render();

            }
        );

    }


    render();

          }
/* =========================================================
   PART 18K
   REGISTRAR DOCUMENT PROCESSING + RELEASE
   ========================================================= */


/* =========================================================
   REGISTRAR DOCUMENTS PAGE
   ========================================================= */

function initializeRegistrarDocuments(){

    const table =
        getElement("registrarDocumentsTable");


    /*
       If the table does not exist, the page may still
       contain the document processing sections.
    */

    if(!table){

        return;

    }


    const requests =
        getAllRequests();


    const processable =
        requests.filter(
            request =>
                [
                    "Approved",
                    "Processing",
                    "Released"
                ].includes(request.status)
        );


    if(!processable.length){

        table.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    class="table-empty"
                >

                    <i class="fa-solid fa-file-circle-check"></i>

                    No documents are currently ready for processing.

                </td>

            </tr>

        `;

        return;

    }


    table.innerHTML =
        processable
        .sort(
            (a,b) =>
                new Date(b.updatedAt || b.createdAt) -
                new Date(a.updatedAt || a.createdAt)
        )
        .map(
            function(request){

                return `

                    <tr>

                        <td>
                            ${escapeHTML(
                                request.requestId
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                request.studentName
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                request.studentId
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                request.documentType
                            )}
                        </td>

                        <td>
                            ${statusBadge(
                                request.paymentStatus
                            )}
                        </td>

                        <td>
                            ${statusBadge(
                                request.clearanceStatus
                            )}
                        </td>

                        <td>
                            ${statusBadge(
                                request.status
                            )}
                        </td>

                        <td>

                            <button
                                type="button"
                                class="table-action"
                                data-document-process="${escapeHTML(
                                    request.requestId
                                )}"
                            >

                                <i class="fa-solid fa-file-circle-check"></i>

                                Process

                            </button>

                        </td>

                    </tr>

                `;

            }
        )
        .join("");

}


/* =========================================================
   RELEASE DOCUMENT
   ========================================================= */

function releaseDocument(requestId){

    const requests =
        getAllRequests();


    const index =
        requests.findIndex(
            request =>
                request.requestId ===
                requestId
        );


    if(index === -1){

        return false;

    }


    const request =
        requests[index];


    if(request.paymentStatus !== "Paid"){

        alert(
            "The document cannot be released because payment has not been completed."
        );

        return false;

    }


    if(
        request.clearanceStatus !==
        "Cleared"
    ){

        alert(
            "The document cannot be released until clearance is completed."
        );

        return false;

    }


    request.status =
        "Released";


    request.processingStatus =
        "Released";


    request.releaseDate =
        new Date().toISOString();


    request.updatedAt =
        new Date().toISOString();


    requests[index] =
        request;


    setStorage(
        ATCRS_KEYS.requests,
        requests
    );


    /* -----------------------------------------------------
       DOCUMENT RECORD
       ----------------------------------------------------- */

    const documents =
        getStorage(
            ATCRS_KEYS.documents,
            []
        );


    documents.push({

        documentId:
            generateId("DOC"),

        requestId:
            request.requestId,

        studentId:
            request.studentId,

        studentName:
            request.studentName,

        documentType:
            request.documentType,

        releaseMethod:
            request.releaseMethod,

        releaseDate:
            request.releaseDate,

        status:"Released"

    });


    setStorage(
        ATCRS_KEYS.documents,
        documents
    );


    return true;

}


/* =========================================================
   DOCUMENT PROCESS BUTTONS
   ========================================================= */

function initializeDocumentProcessButtons(){

    getAll(
        "[data-document-process]"
    ).forEach(
        function(button){

            button.addEventListener(
                "click",
                function(){

                    const requestId =
                        button.dataset.documentProcess;


                    const requests =
                        getAllRequests();


                    const request =
                        requests.find(
                            item =>
                                item.requestId ===
                                requestId
                        );


                    if(!request){

                        return;

                    }


                    const proceed =
                        confirm(
                            `Process document for ${request.studentName}?`
                        );


                    if(!proceed){

                        return;

                    }


                    const success =
                        releaseDocument(
                            requestId
                        );


                    if(success){

                        alert(
                            "Document released successfully."
                        );


                        initializeRegistrarDocuments();

                    }

                }
            );

        }
    );

}


/* =========================================================
   UPDATE CLEARANCE
   ========================================================= */

function updateClearanceRecord(
    requestId
){

    const records =
        getAllClearance();


    const index =
        records.findIndex(
            record =>
                record.requestId ===
                requestId
        );


    if(index === -1){

        return;

    }


    const record =
        records[index];


    const registrarReview =
        getElement(
            "registrarReviewClearance"
        )?.value;


    const financial =
        getElement(
            "registrarFinancialClearance"
        )?.value;


    const library =
        getElement(
            "registrarLibraryClearance"
        )?.value;


    const notes =
        getElement(
            "registrarClearanceNotes"
        )?.value
        || "";


    if(registrarReview){

        record.registrarReview =
            registrarReview;

    }


    if(financial){

        record.financialStatus =
            financial;

    }


    if(library){

        record.libraryStatus =
            library;

    }


    record.notes =
        notes;


    if(
        record.registrarReview === "Cleared" &&
        record.financialStatus === "Cleared" &&
        record.libraryStatus === "Cleared"
    ){

        record.overallStatus =
            "Cleared";

    }else if(
        record.registrarReview === "Issue" ||
        record.financialStatus === "Issue" ||
        record.libraryStatus === "Issue"
    ){

        record.overallStatus =
            "Issue";

    }else{

        record.overallStatus =
            "Pending";

    }


    record.updatedAt =
        new Date().toISOString();


    records[index] =
        record;


    setStorage(
        ATCRS_KEYS.clearance,
        records
    );


    /* -----------------------------------------------------
       UPDATE RELATED REQUEST
       ----------------------------------------------------- */

    const requests =
        getAllRequests();


    const requestIndex =
        requests.findIndex(
            request =>
                request.requestId ===
                requestId
        );


    if(requestIndex !== -1){

        requests[requestIndex]
            .clearanceStatus =
            record.overallStatus;


        requests[requestIndex]
            .updatedAt =
            new Date().toISOString();


        if(
            record.overallStatus ===
            "Cleared"
        ){

            if(
                requests[requestIndex]
                    .paymentStatus === "Paid"
            ){

                requests[requestIndex]
                    .status =
                    "Processing";

            }

        }


        setStorage(
            ATCRS_KEYS.requests,
            requests
        );

    }


    const message =
        getElement(
            "registrarClearanceMessage"
        );


    showMessage(
        message,
        "Clearance information updated successfully.",
        "success"
    );


    initializeRegistrarClearance();

}
/* =========================================================
   PART 18L
   FINAL INITIALIZATION + EVENT CONNECTIONS
   ========================================================= */


/* =========================================================
   INITIALIZE ATCRS
   ========================================================= */

function initializeATCRS(){

    /* -----------------------------------------------------
       AUTH
       ----------------------------------------------------- */

    initializeStudentRegistration();

    initializeStudentLogin();

    initializeRegistrarLogin();

    initializePasswordToggles();


    /* -----------------------------------------------------
       LOGOUT
       ----------------------------------------------------- */

    initializeStudentLogout();

    initializeRegistrarLogout();


    /* -----------------------------------------------------
       STUDENT
       ----------------------------------------------------- */

    loadStudentNames();

    initializeProfilePage();

    initializeStudentDashboard();

    initializeRequestPage();

    initializePaymentPage();

    initializeDocumentsPage();


    /* -----------------------------------------------------
       REGISTRAR
       ----------------------------------------------------- */

    loadRegistrarDate();

    initializeRegistrarDashboard();

    initializeRegistrarStudents();

    initializeRegistrarRequests();

    initializeRegistrarPayments();

    initializeRegistrarClearance();

    initializeRegistrarDocuments();

    initializeDocumentProcessButtons();


    /* -----------------------------------------------------
       GENERAL EVENT CONNECTIONS
       ----------------------------------------------------- */

    initializeGeneralRequestEvents();

    initializeRegistrarDetailEvents();

}


/* =========================================================
   GENERAL REQUEST EVENTS
   ========================================================= */

function initializeGeneralRequestEvents(){

    /* -----------------------------------------------------
       VIEW REQUEST FROM DASHBOARD
       ----------------------------------------------------- */

    getAll(
        "[data-request-view]"
    ).forEach(
        function(button){

            button.addEventListener(
                "click",
                function(){

                    const requestId =
                        button.dataset.requestView;


                    if(isRegistrarPage()){

                        showRegistrarRequestDetails(
                            requestId
                        );

                    }

                }
            );

        }
    );


    /* -----------------------------------------------------
       REGISTRAR REQUEST VIEW
       ----------------------------------------------------- */

    getAll(
        "[data-registrar-request-view]"
    ).forEach(
        function(button){

            button.addEventListener(
                "click",
                function(){

                    showRegistrarRequestDetails(
                        button.dataset.registrarRequestView
                    );

                }
            );

        }
    );

}


/* =========================================================
   REGISTRAR DETAIL EVENTS
   ========================================================= */

function initializeRegistrarDetailEvents(){

    /* -----------------------------------------------------
       CLOSE REQUEST DETAILS
       ----------------------------------------------------- */

    const closeRequestDetails =
        getElement(
            "closeRegistrarRequestDetails"
        );


    if(closeRequestDetails){

        closeRequestDetails.addEventListener(
            "click",
            function(){

                const card =
                    getElement(
                        "registrarRequestDetails"
                    );


                if(card){

                    card.style.display =
                        "none";

                }

            }
        );

    }


    /* -----------------------------------------------------
       STUDENT DETAILS
       ----------------------------------------------------- */

    getAll(
        "[data-student-view]"
    ).forEach(
        function(button){

            button.addEventListener(
                "click",
                function(){

                    showRegistrarStudentDetails(
                        button.dataset.studentView
                    );

                }
            );

        }
    );


    /* -----------------------------------------------------
       PAYMENT DETAILS
       ----------------------------------------------------- */

    getAll(
        "[data-payment-view]"
    ).forEach(
        function(button){

            button.addEventListener(
                "click",
                function(){

                    showRegistrarPaymentDetails(
                        button.dataset.paymentView
                    );

                }
            );

        }
    );


    /* -----------------------------------------------------
       CLEARANCE DETAILS
       ----------------------------------------------------- */

    getAll(
        "[data-clearance-view]"
    ).forEach(
        function(button){

            button.addEventListener(
                "click",
                function(){

                    showRegistrarClearanceDetails(
                        button.dataset.clearanceView
                    );

                }
            );

        }
    );

}


/* =========================================================
   REGISTRAR STUDENT DETAILS
   ========================================================= */

function showRegistrarStudentDetails(
    studentId
){

    const student =
        getStudent();


    if(
        !student ||
        student.studentId !== studentId
    ){

        return;

    }


    const card =
        getElement(
            "studentDetailsCard"
        );


    if(card){

        card.style.display =
            "block";

    }


    const requests =
        getAllRequests()
        .filter(
            request =>
                request.studentId ===
                studentId
        );


    const clearance =
        getAllClearance()
        .find(
            record =>
                record.studentId ===
                studentId
        );


    const fields = {

        selectedStudentName:
            student.fullName,

        selectedStudentId:
            student.studentId,

        selectedStudentStatus:
            "Active",

        selectedStudentEmail:
            student.email,

        selectedStudentIdDetail:
            student.studentId,

        selectedStudentEducation:
            student.educationLevel,

        selectedStudentCourse:
            student.collegeCourse || "—",

        selectedStudentCreated:
            formatDate(student.createdAt),

        selectedStudentRequestCount:
            requests.length,

        selectedStudentFinancialStatus:
            clearance?.financialStatus ||
            "Pending",

        selectedStudentLibraryStatus:
            clearance?.libraryStatus ||
            "Pending",

        selectedStudentClearanceStatus:
            clearance?.overallStatus ||
            "Pending"

    };


    Object.entries(fields).forEach(
        function([id,value]){

            const element =
                getElement(id);

            if(element){

                element.textContent =
                    value || "—";

            }

        }
    );

}


/* =========================================================
   CLOSE STUDENT DETAILS
   ========================================================= */

const closeStudentDetails =
    getElement(
        "closeStudentDetails"
    );


if(closeStudentDetails){

    closeStudentDetails.addEventListener(
        "click",
        function(){

            const card =
                getElement(
                    "studentDetailsCard"
                );


            if(card){

                card.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   REGISTRAR PAYMENT DETAILS
   ========================================================= */

function showRegistrarPaymentDetails(
    paymentReference
){

    const payment =
        getAllPayments()
        .find(
            item =>
                item.paymentReference ===
                paymentReference
        );


    if(!payment){

        return;

    }


    const card =
        getElement(
            "registrarPaymentDetails"
        );


    if(card){

        card.style.display =
            "block";

    }


    const fields = {

        registrarPaymentStudentName:
            payment.studentName,

        registrarPaymentStudentId:
            payment.studentId,

        registrarPaymentEmail:
            payment.email,

        registrarPaymentRequestId:
            payment.requestId,

        registrarPaymentDocument:
            payment.documentType,

        registrarPaymentCopies:
            payment.copies,

        registrarPaymentReference:
            payment.paymentReference,

        registrarPaymentDate:
            formatDate(payment.date),

        registrarPaymentMethod:
            payment.method,

        registrarPaymentAmount:
            `₱${Number(
                payment.amount || 0
            ).toFixed(2)}`,

        registrarPaymentStatus:
            payment.status

    };


    Object.entries(fields).forEach(
        function([id,value]){

            const element =
                getElement(id);

            if(element){

                element.textContent =
                    value || "—";

            }

        }
    );


    const notes =
        getElement(
            "registrarPaymentNotes"
        );


    if(notes){

        notes.value =
            payment.notes || "";

    }

}


/* =========================================================
   REGISTRAR CLEARANCE DETAILS
   ========================================================= */

function showRegistrarClearanceDetails(
    requestId
){

    const records =
        getAllClearance();


    const record =
        records.find(
            item =>
                item.requestId ===
                requestId
        );


    const request =
        getAllRequests()
        .find(
            item =>
                item.requestId ===
                requestId
        );


    if(!record || !request){

        return;

    }


    const card =
        getElement(
            "registrarClearanceDetails"
        );


    if(card){

        card.style.display =
            "block";

    }


    const fields = {

        registrarClearanceStudentName:
            record.studentName,

        registrarClearanceStudentId:
            record.studentId,

        registrarClearanceEmail:
            request.email,

        registrarClearanceRequestId:
            request.requestId,

        registrarClearanceDocument:
            request.documentType,

        registrarClearanceRequestDate:
            formatDate(request.createdAt)

    };


    Object.entries(fields).forEach(
        function([id,value]){

            const element =
                getElement(id);

            if(element){

                element.textContent =
                    value || "—";

            }

        }
    );


    const review =
        getElement(
            "registrarReviewClearance"
        );


    const financial =
        getElement(
            "registrarFinancialClearance"
        );


    const library =
        getElement(
            "registrarLibraryClearance"
        );


    const notes =
        getElement(
            "registrarClearanceNotes"
        );


    if(review){

        review.value =
            record.registrarReview;

    }


    if(financial){

        financial.value =
            record.financialStatus;

    }


    if(library){

        library.value =
            record.libraryStatus;

    }


    if(notes){

        notes.value =
            record.notes || "";

    }


    const update =
        getElement(
            "updateRegistrarClearance"
        );


    if(update){

        update.onclick =
            function(){

                updateClearanceRecord(
                    requestId
                );

            };

    }

}


/* =========================================================
   CLOSE PAYMENT DETAILS
   ========================================================= */

const closePaymentDetails =
    getElement(
        "closeRegistrarPaymentDetails"
    );


if(closePaymentDetails){

    closePaymentDetails.addEventListener(
        "click",
        function(){

            const card =
                getElement(
                    "registrarPaymentDetails"
                );


            if(card){

                card.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   CLOSE CLEARANCE DETAILS
   ========================================================= */

const closeClearanceDetails =
    getElement(
        "closeRegistrarClearanceDetails"
    );


if(closeClearanceDetails){

    closeClearanceDetails.addEventListener(
        "click",
        function(){

            const card =
                getElement(
                    "registrarClearanceDetails"
                );


            if(card){

                card.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   SAVE PAYMENT NOTES
   ========================================================= */

const savePaymentNotes =
    getElement(
        "saveRegistrarPaymentNotes"
    );


if(savePaymentNotes){

    savePaymentNotes.addEventListener(
        "click",
        function(){

            const reference =
                getElement(
                    "registrarPaymentReference"
                )?.textContent;


            const notes =
                getElement(
                    "registrarPaymentNotes"
                )?.value
                || "";


            const payments =
                getAllPayments();


            const index =
                payments.findIndex(
                    payment =>
                        payment.paymentReference ===
                        reference
                );


            if(index === -1){

                return;

            }


            payments[index].notes =
                notes;


            setStorage(
                ATCRS_KEYS.payments,
                payments
            );


            alert(
                "Payment notes saved successfully."
            );

        }
    );

}


/* =========================================================
   FINAL INITIALIZATION SAFETY
   ========================================================= */

window.addEventListener(
    "storage",
    function(){

        /*
           Refresh visible data when another browser tab
           changes ATCRS localStorage data.
        */

        if(isStudentPage()){

            loadStudentNames();

            initializeStudentDashboard();

            initializeDocumentsPage();

        }


        if(isRegistrarPage()){

            initializeRegistrarDashboard();

            initializeRegistrarStudents();

            initializeRegistrarRequests();

            initializeRegistrarPayments();

            initializeRegistrarClearance();

            initializeRegistrarDocuments();

        }

    }
);
/* =========================================================
   PART 18M
   FINAL ATCRS INITIALIZATION + AUTO POPULATION
   ========================================================= */


/* =========================================================
   AUTO-POPULATE PROFILE STATUS
   ========================================================= */

function updateProfileStatus(){

    const student =
        getStudent();


    if(!student){

        return;

    }


    const requests =
        getStudentRequests();


    const latest =
        [...requests]
        .sort(
            (a,b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        )[0];


    let clearance = null;


    if(latest){

        clearance =
            getAllClearance()
            .find(
                item =>
                    item.requestId ===
                    latest.requestId
            );

    }


    const fields = {

        profileRegistrarStatus:
            clearance?.registrarReview ||
            "Pending",

        profileFinancialStatus:
            clearance?.financialStatus ||
            "Pending",

        profileLibraryStatus:
            clearance?.libraryStatus ||
            "Pending"

    };


    Object.entries(fields).forEach(
        function([id,value]){

            const element =
                getElement(id);

            if(element){

                element.innerHTML =
                    statusBadge(value);

            }

        }
    );

}


/* =========================================================
   AUTO-POPULATE REQUEST STUDENT INFORMATION
   ========================================================= */

function populateRequestStudentInformation(){

    const student =
        getStudent();


    if(!student){

        return;

    }


    const fields = {

        requestStudentName:
            student.fullName,

        requestStudentId:
            student.studentId,

        requestStudentEmail:
            student.email,

        requestEducationLevel:
            student.educationLevel,

        requestCourse:
            student.collegeCourse || "—"

    };


    Object.entries(fields).forEach(
        function([id,value]){

            const element =
                getElement(id);

            if(element){

                element.textContent =
                    value || "—";

            }

        }
    );

}


/* =========================================================
   AUTO-POPULATE PAYMENT EMAIL
   ========================================================= */

function populatePaymentStudentInformation(){

    const student =
        getStudent();


    if(!student){

        return;

    }


    const fields = {

        paymentStudentName:
            student.fullName,

        paymentStudentId:
            student.studentId,

        paymentStudentEmail:
            student.email

    };


    Object.entries(fields).forEach(
        function([id,value]){

            const element =
                getElement(id);

            if(element){

                element.textContent =
                    value || "—";

            }

        }
    );

}


/* =========================================================
   AUTO-POPULATE DOCUMENT PAGE
   ========================================================= */

function populateDocumentStudentInformation(){

    const student =
        getStudent();


    if(!student){

        return;

    }


    const fields = {

        documentsStudentName:
            student.fullName,

        documentsStudentId:
            student.studentId,

        documentsStudentEmail:
            student.email

    };


    Object.entries(fields).forEach(
        function([id,value]){

            const element =
                getElement(id);

            if(element){

                element.textContent =
                    value || "—";

            }

        }
    );

}


/* =========================================================
   ADD FINAL INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        populateRequestStudentInformation();

        populatePaymentStudentInformation();

        populateDocumentStudentInformation();

        updateProfileStatus();

    }
);


/* =========================================================
   END OF ATCRS JAVASCRIPT
   ========================================================= */
