var scene = new THREE.Scene();

        {
            const color = 0xc4c4c4;
            const density = 0.01;
            const near = 30;
            const far = 40;
            scene.fog = new THREE.Fog(color, near, far);
        }
      
        var camera = new THREE.PerspectiveCamera (50, window.innerWidth/window.innerHeight, 0.1 ,1000);
        camera.position.z = 20;
     

        // set up renderer 

        var renderer = new THREE.WebGLRenderer({antialias: true, premultipliedAlpha:true});
        renderer.setClearColor("#CCD6D7");
        renderer.setSize( window.innerWidth, window.innerHeight);
        document.body.appendChild (renderer.domElement);

        window.addEventListener ('resize', function()
        {
            var width = window.innerWidth;
            var height = window.innerHeight;
            renderer.setSize (width,height);
            camera.aspect = width/height;
            camera.updateProjectionMatrix();
        });


        // set up lights

        var light = new THREE.AmbientLight (0xFFFFFF, 10);
        scene.add(light);

        var light2 = new THREE.PointLight (0xFFFFFF, 10);
        scene.add(light2);
        
        var light3 = new THREE.DirectionalLight (0xFFffff, 1);
        light3.position.z = 10;
        light3.position.x = 10;
        light3.position.y = 10;
        scene.add(light3);


        // add in object 1  

          // add in data 

        const loader1 = new THREE.GLTFLoader();
        
        var mesh1 = new THREE.Object3D();

        loader1.load('../models/objects1.glb', function(gltf){ 
        
        
        mesh1 = gltf.scene;
        mesh1.name = "mesh1";
        scene.add(mesh1);
        mesh1.position.z = 0;

        });

        mesh1 = scene.getObjectByName(mesh1.name);
        mesh1.visible = true;
            
        // visibility

      
        document.getElementById("hideShowModels").addEventListener("click", function(){
        mesh1.visible = !mesh1.visible;
        
        });
   
        // add in object 2
    
        const loader = new THREE.GLTFLoader();

        var mesh2 = new THREE.Object3D();

       loader.load('../models/text1.glb', function(gltf){

          mesh2 = gltf.scene;
          console.log(mesh2);
          scene.add(mesh2);
          mesh2.position.z = 0; 
          
       });
           mesh2 = scene.getObjectByName(mesh2.name);
           mesh2.visible = true;
          
           //visibility 
          
       
        document.getElementById("hideShowText").addEventListener("click", function(){
        mesh2.visible = !mesh2.visible;
     
        });

        const loader2 = new THREE.GLTFLoader();
        var mesh3 = new THREE.Object3D();

        loader2.load('../models/datadata.glb', function(gltf){

            mesh3 = gltf.scene;
            console.log(mesh3);
            scene.add(mesh3);
            mesh3.position.z = 0;
        });

            mesh3 = scene.getObjectByName(mesh3.name);
            mesh3.visible = true;

            //visibility 
        
        document.getElementById("hideShowData").addEventListener("click", function(){
            mesh3.visible = !mesh3.visible;
        });

    
      
        //add 3d curve

         spline = new THREE.CatmullRomCurve3( [

         new THREE.Vector3(0,0,20),
         new THREE.Vector3(0,0,10),     
         new THREE.Vector3(0,5,5)      
            
            
        //    new THREE.Vector3(5,0,39)
        ]);

        const points = spline.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
      //  const material = new THREE.LineBasicMaterial({color: 0xffff00});
      //  const curveObject = new THREE.Line(geometry,material);
      //  scene.add(curveObject);
       


        // scroll controls, following curve

        window.addEventListener("wheel", onMouseWheel);

        var camPosIndex = 0;

        
       function onMouseWheel(event)
        {
         
  
        if (event.deltaY < 0){

         
            camPosIndex++;

           var camPos = spline.getPoint(camPosIndex/100);
           // var camRot = spline.getTangent(camPosIndex);
              
                  camera.position.x = camPos.x ;
                  camera.position.y = camPos.y;
                  camera.position.z = camPos.z;
  
                 camera.rotation.x = camRot.x;
                 camera.rotation.y = camRot.y;
                 camera.rotation.z = camRot.z;
  
                 camera.lookAt(spline.getPoint((camPosIndex+1) / 100));   
         update();
       
       }
      

           else if (event.deltaY > 0)
            {
           
            camPosIndex--;

            var camPos = spline.getPoint(camPosIndex/100);
           // var camRot = spline.getTangent(camPosIndex);
              
                  camera.position.x =  camPos.x ;
                  camera.position.y =  camPos.y ;
                  camera.position.z =  camPos.z;
  
                camera.rotation.x = camRot.x;
                camera.rotation.y = camRot.y;
                camera.rotation.z = camRot.z;
  
                camera.lookAt(spline.getPoint((camPosIndex+1) / 100));
                update();
                
          
          }
        
         //   camera.position.z += event.deltaY * 0.01;
      
         
         };

       // }
        
          //   mesh.rotation.y += event.deltaY * 0.001;

            

        // follow mouse cursor

        const mouse = new THREE.Vector2();
        const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );
        const target = new THREE.Vector2();

        document.addEventListener( 'mousemove', onMouseMove);

        function onMouseMove( event ) {

            mouse.x = ( event.clientX - windowHalf.x );
            mouse.y = ( event.clientY - windowHalf.x );

        }

      
        var update = function()
        {
         
           
           
          
        };

        var render = function ()
        {

            renderer.render(scene,camera);
           
           
        };

        var GameLoop = function ()
        {
            target.x = ( 1 - mouse.x ) * 0.001;
            target.y = ( 1 - mouse.y ) * 0.001;
  
            camera.rotation.x += 0.001 * ( target.y - camera.rotation.x );
          camera.rotation.y += 0.001 * ( target.x - camera.rotation.y );

           
          
            update ();
            render ();
            requestAnimationFrame (GameLoop);
        
        };

        GameLoop ();