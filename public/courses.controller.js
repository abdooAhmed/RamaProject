// AngularJS-kod som vi går igenom mer i detalj i sektion 2 - Angular. 
// Fokusera på $scope i funktionen successCallBack i den här laborationen.

// Skapar modulen myCoursesApp
angular.module('CoursesApp', []) // Läs 1 nedan
    .controller('CoursesController', function CoursesController($scope, $http) { // Läs 2 nedan 
        // Lägger till variabeln studentId som nu kan nås/användas i html-koden
        $scope.studentId = 'rabi2000';
        
        $scope.courseCode = '';
        $scope.subjectCode = '';
        $scope.level = '';
        $scope.progression = '';
        $scope.name = '';
        $scope.points = '';
        $scope.institutionCode = '';
        $scope.subjectCode = '';
        $scope.subject = '';
        $scope.preamble = '';
        $scope.bodyText = '';
        $scope.language = '';
        $scope.courseCode= '';
        $scope.status ='';
        
        
        $scope.courses = null;
        $scope.subjects = null;
        $scope.myCourses = null;


        
    

        $scope.getAllCourses = function () {
            $http.get("/api/courses/").then(
                function successCallback(response) { // Läs 4 nedan
            // this callback will be called asynchronously when the response is available

            // För att underlätta användningen av data i response lagrar vi det i en variabel
            const data = response.data;
            
            // Läs 5 nedan
           // $scope.myCourses = data.myCourses;
            $scope.courses = data.courses;
           // $scope.subjects = data.subjects;
        },
            function errorCallback(response) { // Läs 6 nedan
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("Error reading courses.json! response=" + JSON.stringify(response));
            } 
        );
        };

        $scope.getAllSubjects = function () {
            $http.get('api/subjects').then(
                function successCallback(response) {
                    // this callback will be called asynchronously when the response is available
                    $scope.subjects = response.data.subjects;
                },
                function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status
                    // we should notify the user in some way, but for now we output to console
                    console.log('Error getting all subjects: response=' + JSON.stringify(response));
                }
            );
        };


        $scope.getAllMyCourses = function () {
            $http.get('api/my/courses').then(
                function successCallback(response) {
                    // this callback will be called asynchronously when the response is available
                    $scope.myCourses = response.data.myCourses;
                },
                function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status
                    // we should notify the user in some way, but for now we output to console
                    console.log('Error getting all mycourses: response=' + JSON.stringify(response));
                }
            );
        };

   

        $scope.addCourse = function () {
            // TODO: We should first validate what the user has entered in the text fields

            // Create the 'body' with the data to be sent to the API
            const body = {
                courseCode: $scope.courseCode,
                subjectCode: $scope.subjectCode,
                level: $scope.level,
                progression: $scope.progression,
                name: $scope.name,
                points: $scope.points,
                institutionCode: $scope.institutionCode,
             

            }
            $http.post('/api/courses', body).then(
                function successCallback(response) {
                    // The user was added
                    // TODO: Notify the user!

                    // Get all users from API (reload/refresh users)
                    $scope.getAllCourses();  
                }
                ,
                function errorCallback(response) {
                    // TODO: Inform the user about what went wrong in a better way than in an alert.
                    alert(response.data.error);

                    // Output response data to console
                    console.log(`Error adding course: ${response.data.error}`);
                }
                );
            };



            $scope.addMyCourse = function () {
                // TODO: We should first validate what the user has entered in the text fields
    
                // Create the 'body' with the data to be sent to the API
                const body = {
                    courseCode: $scope.courseCode,
                    status: $scope.status,
                    }
                $http.post('/api/my/courses', body).then(
                    function successCallback(response) {
                        // The user was added
                        // TODO: Notify the user!
    
                        // Get all users from API (reload/refresh users)
                        $scope.getAllMyCourses();  
                    }
                    ,
                    function errorCallback(response) {
                        // TODO: Inform the user about what went wrong in a better way than in an alert.
                        alert(response.data.error);
    
                        // Output response data to console
                        console.log(`Error adding mycourse: ${response.data.error}`);
                    }
                    );
                };
    

                $scope.editMyCourse = function () {
                    // TODO: We should first validate what the user has entered in the text fields
        
                    // Create the 'body' with the data to be sent to the API
                    const body = {
                        courseCode: $scope.courseCode,
                        status: $scope.status,
                        }
                    $http.put('/api/my/courses', body).then(
                        function successCallback(response) {
                            // The user was added
                            // TODO: Notify the user!
        
                            // Get all users from API (reload/refresh users)
                            $scope.getAllMyCourses();  
                        }
                        ,
                        function errorCallback(response) {
                            // TODO: Inform the user about what went wrong in a better way than in an alert.
                            alert(response.data.error);
        
                            // Output response data to console
                            console.log(`Error putting mycourse: ${response.data.error}`);
                        }
                        );
                    };
    



            $scope.addSubject = function () {
                // TODO: We should first validate what the user has entered in the text fields
    
                // Create the 'body' with the data to be sent to the API
                const body = {
                    subjectCode: $scope.subjectCode,
                    subject: $scope.subject,
                    preamble: $scope.preamble,
                    bodyText: $scope.bodyText,
                    language: $scope.language,
                   
    
                }
                $http.post('/api/subjects', body).then(
                    function successCallback(response) {
                        // The user was added
                        // TODO: Notify the user!
    
                        // Get all users from API (reload/refresh users)
                        $scope.getAllSubjects();  
                    }
                    ,
                    function errorCallback(response) {
                        // TODO: Inform the user about what went wrong in a better way than in an alert.
                        alert(response.data.error);
    
                        // Output response data to console
                        console.log(`Error adding subject: ${response.data.error}`);
                    }
                    );
                };


                $scope.deleteCourse = function (courseCode) {
                    // Call the API
                    $http.delete('/api/courses/' + courseCode).then(
                        function successCallback(response) {
                            // The user was delete
                            // TODO: Notify the user!
                            console.log(`The following course was deleted: ${JSON.stringify(response.data)}`);
        
                            // Get all users from API (reload/refresh users)
                            $scope.getAllCourses();
                        }
                        ,
                        function errorCallback(response) {
                            // TODO: Inform the user about what went wrong in a better way than in an alert.
                            alert(response.data.error);
        
                            // Output response data to console
                            console.log(`Error deleting course: ${response.data.error}`);
                        }

                        );
                    };


                    
                    //$scope.getAllCourses();


                    $scope.getCourse = function (courseCode) {
                        // Call the API
                        $http.get('/api/courses/' + courseCode).then(
                            function successCallback(response) {
                                // The user was delete
                                // TODO: Notify the user!
                                console.log(`The course: ${JSON.stringify(response.data)}`);
            
                                // Get all users from API (reload/refresh users)
                             
                            }
                            ,
                            function errorCallback(response) {
                                // TODO: Inform the user about what went wrong in a better way than in an alert.
                                alert(response.data.error);
            
                                // Output response data to console
                                console.log(`Error getting course: ${response.data.error}`);
                            }
    
                            );
                        };


                        $scope.getmyCourse = function (courseCode) {
                            // Call the API
                            $http.get('/api/my/courses/' + courseCode).then(
                                function successCallback(response) {
                                    // The user was delete
                                    // TODO: Notify the user!
                                    console.log(`The course: ${JSON.stringify(response.data)}`);
                
                                    // Get all users from API (reload/refresh users)
                                 
                                }
                                ,
                                function errorCallback(response) {
                                    // TODO: Inform the user about what went wrong in a better way than in an alert.
                                    alert(response.data.error);
                
                                    // Output response data to console
                                    console.log(`Error getting course: ${response.data.error}`);
                                }
        
                                );
                            };

                            
                        $scope.getsubject = function (subjectCode) {
                            // Call the API
                            $http.get('/api/subjects' + subjectCode).then(
                                function successCallback(response) {
                                    // The user was delete
                                    // TODO: Notify the user!
                                    console.log(`The subject: ${JSON.stringify(response.data)}`);
                
                                    // Get all users from API (reload/refresh users)

                                }
                                ,
                                function errorCallback(response) {
                                    // TODO: Inform the user about what went wrong in a better way than in an alert.
                                    alert(response.data.error);
                
                                    // Output response data to console
                                    console.log(`Error getting subject: ${response.data.error}`);
                                }
        
                                );
                            };



                    $scope.addMyCourse = function (courseCode) {
                        // Call the API
                        $http.post('/api/my/courses/' + courseCode).then(
                            function successCallback(response) {
                                // The user was delete
                                // TODO: Notify the user!
                                console.log(`The following course was added: ${JSON.stringify(response.data)}`);
            
                                // Get all users from API (reload/refresh users)
                                $scope.getAllMyCourses();
                            }
                            ,
                            function errorCallback(response) {
                                // TODO: Inform the user about what went wrong in a better way than in an alert.
                                alert(response.data.error);
            
                                // Output response data to console
                                console.log(`Error adding mycourse: ${response.data.error}`);
                            }
    
                            );
                        };
    
                        
                        
                        //$scope.getAllCourses();

                        
                    $scope.deletemyCourse = function (courseCode) {
                        // Call the API
                        $http.delete('/api/my/courses/' + courseCode).then(
                            function successCallback(response) {
                                // The user was delete
                                // TODO: Notify the user!
                                console.log(`The following course was deleted: ${JSON.stringify(response.data)}`);
            
                                // Get all users from API (reload/refresh users)
                                $scope.getAllMyCourses();
                            }
                            ,
                            function errorCallback(response) {
                                // TODO: Inform the user about what went wrong in a better way than in an alert.
                                alert(response.data.error);
            
                                // Output response data to console
                                console.log(`Error deleting course: ${response.data.error}`);
                            }
    
                            );
                        };
    
                        
                        
                    $scope.getAllCourses();
                    $scope.getAllSubjects (); 
                        
                    
                }
            );

           // $scope.getAllCourses();

            

/*
1.
    Från dokumentationen av AngularJS finner vi att:

    "You can think of a module as a container for the different parts of your app – controllers, services, filters,
    directives, etc."

    I det här läget av kursen kan vi se det som startpunkten för vår app med namnet myCoursesApp.

2.
    Från AngularJS läser vi att: "Controllers are the behavior behind the DOM elements".

    Här skapar vi en ny controller med namnet MyCoursesController. AngularJS kommer att skicka ett $scope-objekt
    när vår controller skapas. Från dokumentationen av AngularJS finner vi att:

    "The $scope in an AngularJS is a built-in object, which contains application data and methods. You can create
    properties to a $scope object inside a controller function and assign a value or function to it. The $scope is
    glue between a controller and view (HTML)."

    Utöver $scope väljer vi att inkludera $http i vår MyCoursesController. Från dokumentationen av AngularJS finner vi att:

    "The $http service is a core AngularJS service that facilitates communication with the remote HTTP servers via
    the browser's XMLHttpRequest object or via JSONP."

3.
    Via $http och dess metod get (utför en GET-begäran) kan vi läsa resurer via den url som anges som första argument.
    I det här fallet är resursen filen miun-db.json (som nu ligger i samma katalog som denna fil, men url kan lika gärna
    vara till en publik webbserver där json-filen ligger).

    Metoden get är en så kallad asynkron metod som returnerar sitt värde "någon gång i framtiden" som en Promise. När en
    Promise returneras av en metod har den antingen tillståndet "fulfilled" (med ett värde) eller "rejected" (med ett error).

    (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

4.
    På ett Promise kan vi anropa metoden "then" och som argument skickar vi två "callback functions" för de två tillstånd
    Promise kan ha. Den första callback anropas vid tillståndet "fulfilled/success" och den andra callback anropas vid
    tillståndet "rejected/failure ".

5.
    Som nämnts ovan i punkt 2 används $scope som klistret mellan appens logik och vyn (html-sidan). Till $scope kan du addera
    egna egenskaper (värden/variabler) och beteenden (funktioner). I detta exempel lägger vi värdet (value) från information
    (key) i miun-db.json till $scope.information. All kursdata från miun-db.json lägger vi i $scope.courses. Variablerna information
    och courses blir nu åtkomliga från t.ex. index.html.

6.
    Normalt ska vi hantera alla typer av errors i en app och meddela användaren på lämpligt sätt om dessa. Nu loggar vi bara
    till konsolen att det inte gick att läsa från filen.
*/