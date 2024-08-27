/** 
Developed For: 3D Gis, Geodesy and Geomatics Engineering
Instructor: Dr. Shabnam Jabari
-----------------------------------------------------------
Presented Date :05-12-2022
Version No. 0.1.2:
  Major changes ============= Date Name Change descriptions
  To load .glb file using cesium.js
*/

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
const viewer = new Cesium.Viewer('Container', {
    animation: false,
    requestRenderMode: true,
    maximumRenderTimeChange: Infinity,
    // terrainProvider: Cesium.createWorldTerrain(),
    homeButton: true,
    baseLayerPicker: true,
    infoBox: true,
    sceneModePicker: true,
    timeline: false,
    navigationInstructionsInitiallyVisible: false,
    navigationHelpButton: true,
});

var Checkbox_2010 = document.getElementById('2010');

var Checkbox_2018 = document.getElementById('2018');

var Checkbox_2022 = document.getElementById('2022');

// event listeners for 2022
Checkbox_2022.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        load2022Extrude();
    } else {
        if (loadedGeometries.hasOwnProperty('2022')) {
            viewer.scene.primitives.remove(loadedGeometries['2022']);
        }
    }
});

// event listeners for 2018
Checkbox_2018.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        load2018Extrude();
    } else {
        if (loadedGeometries.hasOwnProperty('2018')) {
            viewer.scene.primitives.remove(loadedGeometries['2018']);
        }
    }
});

// event listeners for 2010
Checkbox_2010.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        load2010Extrude();
    } else {
        if (loadedGeometries.hasOwnProperty('2010')) {
            viewer.scene.primitives.remove(loadedGeometries['2010']);
        }
    }
});

var loadedGeometries = {};

//functions for 2022
function load2022Extrude() {
    var denhaag = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: 'js/denhaag_2022/tileset.json',
            maximumNumberOfLoadedTiles: 1000,
            maximumScreenSpaceError: 100,
            debugColorizeTiles: true,
            //color: Cesium.Color.BLUE,
            colorBlendAmount: 10.0,
        })
    );

    var geometryID = '2022';
    denhaag.readyPromise.then(function (tileset) {
        // loadedGeometries[geometryID] = tileset;
        viewer.flyTo(tileset);
        var boundingSphere = tileset.boundingSphere;
        viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0, -2.0, 0));
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        // Position tileset
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        var surface = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            0.0
        );

        var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        console.log(tileset.modelMatrix);
        loadedGeometries[geometryID] = tileset;

        var offset = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            0.0
        );
    });
}

// functions for 2018
function load2018Extrude() {
    var denhaag = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: 'js/denhaag_2018/tileset.json',
            maximumNumberOfLoadedTiles: 1000,
            maximumScreenSpaceError: 100,
            colorBlendAmount: 5.0,
        })
    );
    var geometryID = '2018';
    denhaag.readyPromise.then(function (tileset) {
        // loadedGeometries[geometryID] = tileset;
        viewer.flyTo(tileset);
        var boundingSphere = tileset.boundingSphere;
        viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0, -2.0, 0));
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        // Position tileset
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        var surface = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            0.0
        );
        var offset = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            0.0
        );
        var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        console.log(tileset.modelMatrix);
        loadedGeometries[geometryID] = tileset;
    });
}

// function for 2010_tileset
function load2010Extrude() {
    var denhaag = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: 'js/denhaag_2010/tileset.json',
        })
    );

    var geometryID = '2010';
    denhaag.readyPromise.then(function (tileset) {
        viewer.flyTo(tileset);
        var boundingSphere = tileset.boundingSphere;
        viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0, -2.0, 0));
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        // Position tileset
        var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
        var surface = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            0.0
        );
        var offset = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            0.0
        );
        var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        console.log(tileset.modelMatrix);
        loadedGeometries[geometryID] = tileset;
    });
}
