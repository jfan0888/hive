/**
 * Aux.js
 * 
 * Bind all UI Components and data model
 * 
 * @author Ashish Singh [https://github.com/git-ashish](GitHub)
 */

(function Aux() {

    var dispatch = d3.dispatch('filterUpdate', 'applyFiltersOnData', 'datasetRefreshed', 'mapLoaded', 'dataLoaded', 'updateProfileGeoJSON', 'adhocMetricUpdate', 'adhocUpdateDone', 'profile-features-joined', 'toggleBookmark', 'showProfileOnMap', 'resetFilters'),
    sUrlProfile = 'data/viz/profile-data.csv',

    DataManager,

    map,

    oCountiesGeoJSON;


    // UI Layer
    // 
    function initUI() {

        // Define DOM elements
        // 

        // Define UI Filters
        // 

        var aFilters = [
            // Bookmarked
            //
            /*{
                id: '#filter_bookmarked',
                label: 'Bookmark Status',
                type: 'dropdown',
                metric: '_isBookmarked',
                values: [{
                    label: 'All',
                    selected: true,
                    value: 'All'
                }, {
                    label: 'Yes',
                    value: 'true'
                }, {
                    label: 'No',
                    value: 'false'
                }]
            },
            */
            // Adoption Score
            //
            {
                id: '#filter_hardware',
                label: 'Hardware Adoption',
                type: 'range-slider',
                metric: 'Hardware Score',
                isDataDriven: true,
                range: {
                    min: 0,
                    max: 99,
                    step: 1
                }
            },
            {
                id: '#filter_software',
                label: 'Software Adoption',
                type: 'range-slider',
                metric: 'Software Score',
                isDataDriven: true,
                range: {
                    min: 0,
                    max: 99,
                    step: 1
                }
            },
            {
                id: '#filter_savviness',
                label: 'Technology Savviness',
                type: 'range-slider',
                metric: 'Savviness Index',
                isDataDriven: true,
                range: {
                    min: 0,
                    max: 300,
                    step: 1
                }
            },

            // Demographics
            // 
            {
                id: '#filter_gender',
                label: 'Gender',
                type: 'dropdown',
                metric: 'Gender',
                values: [{
                    label: 'All',
                    selected: true,
                    value: 'All'
                }, {
                    label: 'Male',
                    value: 'Male'
                }, {
                    label: 'Female',
                    value: 'Female'
                }]
            }, {
                id: '#filter_age',
                label: 'Age',
                type: 'range-slider',
                metric: '_age',
                isRangeValue: true,
                isDataDriven: true,
                range: {
                    min: 0,
                    max: 100,
                    step: 1
                }
            }, {
                id: '#filter_employment',
                label: 'Employment Status',
                type: 'multi-dropdown',
                metric: 'Employment Status',

                values: [{
                        label: "All",
                        value: "All",
                        selected: true
                    }, {
                        label: "Employed full-time",
                        value: "Working F/T"
                    },
                    {
                        label: "Employed part-time",
                        value: "Working P/T"
                    }, {
                        label: "Self-employed",
                        value: "Self-Employed"
                    },
                    {
                        label: "Temporarily unemployed",
                        value: "Unemployed/Looking for work"
                    }, {
                        label: "Full-time student",
                        value: "F/T Student"
                    }, {
                        label: "Retired",
                        value: "Retired"
                    }, {
                        label: "A homemaker",
                        value: "Homemaker"
                    }
                ]
            }, {
                id: '#filter_ownrent',
                label: 'Own or Rent',
                type: 'dropdown',
                metric: 'Own-Rent',
                values: [{
                        label: "All",
                        value: "All",
                        selected: true
                    }, {
                        label: "Own",
                        value: "Own"
                    },
                    {
                        label: "Rent",
                        value: "Rent"
                    }
                ]
            }, {
                id: '#filter_hhi',
                label: 'Annual HHI',
                type: 'range-slider',
                metric: '_hhi',
                isDataDriven: true,
                isRangeValue: true,
                range: {
                    min: 0,
                    max: 100000,
                    step: 1
                }
            }, {
                id: '#filter_children',
                label: 'Children in Home',
                type: 'range-slider',
                metric: 'Children in Home',
                isDataDriven: true,
                range: {
                    min: 0,
                    max: 10,
                    step: 1
                }
            }, 
            // ZIP Code Associations
            // 
            {
                id: '#filter_zip_den',
                label: 'People per square mile',
                type: 'range-slider',
                metric: 'den',
                isAdhoc: true,
                isFeatureDriven: true,
                description: true,
                hasLegend: '#legend_den',
                step: 10,
                range: {
                    min: 0,
                    max: 157000,
                    step: 1
                }
            }, {
                id: '#filter_zip_unemp',
                label: 'Percentage',
                type: 'range-slider',
                metric: 'unemp',
                isAdhoc: true,
                isFeatureDriven: true,
                description: true,
                hasLegend: '#legend_unemp',
                range: {
                    min: 0,
                    max: 100,
                    step: 1
                }
            },

            // Usage
            // 
            {
                id: '#filter_annual_support',
                label: 'Annual Support Requests',
                type: 'range-slider',
                metric: '_support_req',
                isDataDriven: true,
                range: {
                    min: 0,
                    max: 10,
                    step: 1,
                    hasPlus: true
                }
            }, {
                id: '#filter_purchased_protection',
                label: 'Purchased Protection',
                type: 'dropdown',
                metric: 'Purchased Protection',
                values: [{
                        label: "All",
                        value: "All",
                        selected: true
                    }, {
                        label: "Yes",
                        value: "1"
                    },
                    {
                        label: "No",
                        value: "0"
                    }
                ]
            },{
                id: '#filter_num_device_protection',
                label: 'Devices with Protection Plans',
                type: 'range-slider',
                metric: '# of Devices with Protection Plans',
                isDataDriven: true,
                range: {
                    min: 0,
                    max: 15,
                    step: 1
                }
            }, {
                id: '#filter_perception_protection',
                label: 'Perception of Protection',
                type: 'multi-dropdown',
                metric: 'Perception of Protection',
                values: [{
                        label: "All",
                        value: "All",
                        selected: true
                    }, {
                        label: "Waste of money",
                        value: "Waste of money"
                    },
                    {
                        label: "Just hope for the best",
                        value: "Just hope for the best"
                    },
                    {
                        label: "Makes sense for expensive",
                        value: "Makes sense for expensive"
                    },
                    {
                        label: "Smart and responsible thing to do",
                        value: "Smart and responsible thing to do"
                    }
                ]
            }, {
                id: '#filter_techsupport',
                label: 'Tech Support Person',
                type: 'multi-dropdown',
                metric: 'Tech Support Person',
                values: [{
                        label: "All",
                        value: "All",
                        selected: true
                    },{
                        label: "A Child",
                        value: "A child"
                    }, {
                        label: "Me",
                        value: "Me"
                    },
                    {
                        label: "A partner or spouse",
                        value: "A partner or spouse"
                    },
                    {
                        label: "Someone else that does not live in the household",
                        value: "Someone else that does not live in the household"
                    },
                    {
                        label: "I typically seek out a professional for tech support",
                        value: "I typically seek out a professional for tech support"
                    }
                ]
            }, { 
                id: '#filter_ethnicity',
                label: 'Ethnicity',
                type: 'multi-dropdown',
                metric: 'Ethnicity',
                isDataDriven: true,
                values: [{
                        label: "All",
                        value: "All",
                        selected: true
                    },{
                        label: "African American",
                        value: "African American"
                    }, {
                        label: "Asian",
                        value: "Asian"
                    }, {
                        label: "Caucasian",
                        value: "Caucasian"
                    },
                    {
                        label: "Hispanic/Latino",
                        value: "Hispanic/Latino"
                    },
                    {
                        label: "Mid-Eastern",
                        value: "Mid-Eastern"
                    },
                    {
                        label: "Pacific Islander",
                        value: "Pacific Islander"
                    },{
                        label: "Native American",
                        value: "Native American"
                    }
                ]
            }

        ],

        oFiltersMap = d3.map(aFilters, function(d){
          return d.id;
        }),
        
        // Array of Filter instances
        // 
        aActiveFilters = [],

        // Enable filters that are currenlty applicable here
        // 
        aEnabledFilters = [
          '_isBookmarked',
          '_age', 
          '_hhi', 
          'Gender', 
          'Own-Rent', 
          'Employment Status', 
          'Hardware Score', 
          'Software Score',
          'Savviness Index', 
          'Annual Support Requests',
          'Purchased Protection',
          'Perception of Protection',
          'Tech Support Person',
          'Children in Home',
          'unemp',
          'den',
          'Ethnicity',
          '# of Devices with Protection Plans'
        ],

        aDataDrivenFilters = aFilters.filter(function(oF){
          return oF.isDataDriven;
        }),

        aFeatureDrivenFilters = aFilters.filter(function(oF){
          return oF.isFeatureDriven;
        }),

        // Store reference to features of all profiles
        // 
        oProfileFeatures = {},

        bookmarkListTpl = d3.select('#profile_miniscore_tpl').html();
        
        Mustache.parse(bookmarkListTpl);

        // Update

        // Create controls
        // 
        function initFilters() {

          // Enable UI
          // 



          // Initialize data driven filters
          // 
          initDataDrivenFilters();

          // Update Filters from Map
          // 
          aFilters = oFiltersMap.values();
          

          // Create Controls
          // 
          aFilters.filter(function(oF){
            return aEnabledFilters.indexOf(oF.metric) > -1;
          }).forEach(function(oF) {

              var oFilter = new Filter(oF);

              // Preserve instance
              // 
              aActiveFilters.push(oFilter);

              // add to DOM
              // 
              oFilter.createHTML();

              // Bind a dispatch
              oFilter.onchange = function(values) {

                // Don't trigger for adhoc filters
                // They handle their change via dispatches
                // 
                if (oF.isAdhoc) {

                  dispatch.apply('adhocMetricUpdate', null, [{
                    metric: oF.metric,
                    isAdhoc: true,
                    type: oF.type,
                    value: values
                  }])

                }else{

                  dispatch.apply('filterUpdate', null, [{
                      metric: oF.metric,
                      type: oF.type,
                      value: values
                  }]);

                }

              }

              oFilter.onselect = function(values) {

                // Don't trigger for adhoc filters
                // They handle their change via dispatches
                // 
                if (oF.isAdhoc) {

                  dispatch.apply('adhocMetricUpdate', null, [{
                    metric: oF.metric,
                    isAdhoc: true,
                    type: oF.type,
                    value: values
                  }])

                }

              }

          });

        }

        // Initialize data driven filters
        // 
        function initDataDrivenFilters() {

          var aData = DataManager.getMainSet();

          aData.forEach(function(d){

            // For every filter
            // 
            aDataDrivenFilters.forEach(function(oF){

              if (oF.type == 'dropdown' || oF.type == 'multi-dropdown') {
                // Create an array of values
                // 
                if (d[oF.metric]) {

                  oF.values = oF.values || [{
                    label: 'All',
                    value: 'All',
                    selected: true
                  }];

                  oF.values.push({
                    label: _.capitalize(d[oF.metric]),
                    value: d[oF.metric]
                  });

                }

              }else if(oF.type == 'range-slider'){

                // Define a range property
                // 
                if (d[oF.metric]) {

                  oF._values = oF._values || [];

                  // is isRangeValue
                  // 
                  if (oF.isRangeValue) {
                    oF._values.push(parseFloat(d[oF.metric].min) || 0);
                    oF._values.push(parseFloat(d[oF.metric].max) || 0);
                  }else{
                    oF._values.push(parseFloat(d[oF.metric]) || 0);
                  }

                }

              }

            });

          });

          // Make the filter values Unique
          // and Update filters map
          // 
          aDataDrivenFilters.map(function(oF){

            if (oF.type == 'dropdown' || oF.type == 'multi-dropdown') {

              oF.values = d3.map(oF.values, function(d){
                return d.value;
              }).values();
              
            }else if(oF.type == 'range-slider'){


              var aExtent = d3.extent(oF._values),
              // only max to 10 when value is large
              step = aExtent[1] < 100 ? 1 : Math.round(Math.max(aExtent[1]/10, 1));

              delete oF._values;

              oF.range = {
                min: Math.min(0, aExtent[0]),
                max: Math.max(aExtent[1], step * 10),
                // max 10 steps
                step: step
              }

            }

            // Update original filter
            // 
            oFiltersMap.set(oF.id, oF);

          });

        }

        // Initialize feature based filters
        // 
        function initFeatureBasedMetrics(aGeoJSON) {

          aGeoJSON.features.forEach(function(f){

            aFeatureDrivenFilters.forEach(function(oF){

              if(oF.type == 'range-slider'){

                // Define a range property
                // 

                oF._values = oF._values || [];

                oF._values.push(parseFloat(f.properties[oF.metric]) || 0);

              }

            })

          });

          // Make the filter values Unique
          // and Update filters map
          // 
          aFeatureDrivenFilters.map(function(oF){

            if(oF.type == 'range-slider'){

              var aExtent = d3.extent(oF._values),
              // only max to 10 when value is large
              step = aExtent[1] < 100 ? 1 : Math.round(Math.max(aExtent[1]/10, 1));

              delete oF._values;

              oF.range = {
                min: aExtent[0],
                max: Math.round(Math.max(aExtent[1], step * 10)),
                // max 10 steps
                step: step
              }

            }

            // Update original filter
            // 
            oFiltersMap.set(oF.id, oF);

          });
          
        }

        // Apply active filters on the dataset
        // oFiltersMap
        function applyFilters() {

          // Build filter objects
          // 
          
          // AdHoc Filters should be skipped as they handle their
          // filtering separately ( not directly bound to profile dataset )
          // property isAdhoc = true
          // 
          var _aFilters = aActiveFilters.filter(function(oF){
            return !oF.getState().isAdhoc;
          }).map(function(oF){
            return oF.getState();
          });

          // TODO
          // Do this in a Worker
          // 
          DataManager.setQuerySet( applyFiltersOnData(_aFilters, DataManager.getMainSet()) );

          //console.log('Filtered Data', DataManager.getQuerySet());

          // Dispatch info and new dataset
          // 
          dispatch.apply('datasetRefreshed', null, [DataManager.getQuerySet()]);
          
        }

        // Reset all defined filers
        // 
        function resetFilters() {

          // Reset every active filter
          aActiveFilters.forEach(function(oF){
            oF.reset();
          });
          
          // Update results
          // 
          dispatch.apply('applyFiltersOnData');

          // Reset Zip Filter
          // 
          jQuery('#filter_zip li[default]').trigger('click');
        }

        // Show a list of Bookmarked Profiles
        // 
        function showBookmarkList(aBookmarkIds) {

          var target = jQuery('#bookmarked_items .bookmarked-profiles'),
          aData;

          // reset
          // 
          target.html('');

          // Get Profiles with features
          // 
          
          aData = oProfileFeatures.values().filter(function(f){
            return aBookmarkIds.indexOf(f.properties.ID) > -1;
          }).map(function(d){
            return getProfileWithMetaProperties(d.properties);
          });

          target.html(Mustache.render(bookmarkListTpl, {
            profiles: aData
          }));

          // Bind Events
          // 

          target.find('li').off('click').on('click', function(){
            // Show Large profile on the Map
            // 
            var id = this.getAttribute('data-id'),
            oData = oProfileFeatures.get(id);

            oData.properties.isActiveProfile = true;

            // dispatch
            // 
            dispatch.apply('showProfileOnMap', null, [oData]);

            // Add an active class on the li
            // 
            jQuery(this).siblings().removeClass('active');
            jQuery(this).addClass('active');

          });

        }

        // Update Filter Panel UI
        //
        function updateFilterPanel(obj) {

          if (obj && obj.recordCount) {

            // Update Record Count
            // 
            d3.select('#record-count')
              .html(obj.recordCount);

          }

          // Update Bookmark Count
          // 
          d3.select('#bookmark-count')
            .html(DataManager.getBookmarkCount());
          
        }

        // Do Event Binding
        // 
        
        // Listen to requests for Filtering dataset
        // 
        dispatch.on('applyFiltersOnData.aux', function(){

          //console.log('Filtering Dataset');

          setTimeout(function(){
            
            applyFilters();

          }, 1);

        });

        // Listen for Dataset update and Update UI
        // 
        dispatch.on('datasetRefreshed.ui', function(aData){

          updateFilterPanel({
            recordCount: aData.length
          });

        });

        dispatch.on('adhocUpdateDone.ui', function(oPayload){

          updateFilterPanel({
            recordCount: oPayload.count
          });

        });

        dispatch.on('dataLoaded.ui', function(){
          
          // Update Count
          // 
          updateFilterPanel({
            recordCount: DataManager.getQuerySet().length
          });

          // Initialize Data Driven Filters
          // 
          initFilters();

          // Show currently bookmarked profiles
          // 
          showBookmarkList( DataManager.getBookmarks() );

        });

        dispatch.on('toggleBookmark.ui', function(){
          updateFilterPanel();

          // Show currently bookmarked profiles
          // 
          showBookmarkList( DataManager.getBookmarks() );
        });

        // Reset all filters to their init positions
        // 
        dispatch.on('resetFilters.ui', function(){

          resetFilters();

        });

        // Profile dataset has been joined with Map
        // Called only once
        // 
        dispatch.on('profile-features-joined.ui', function(aGeoJSON){

          // prepare a ProfileID - feature map
          // 
          oProfileFeatures = d3.map(aGeoJSON.features, function(d){
            return d.properties.ID;
          });

          initFeatureBasedMetrics(aGeoJSON);

          // Enable the Vis
          // 
          jQuery('body').removeClass('loading');

        });

        // Add Keyboard navigation support to the Bookmarked list items
        // 
        jQuery('body').off('keydown').on('keydown', function(e){

          var target = jQuery('#bookmarked_items .bookmarked-profiles'),
          selected = target.find('li.active'),
          li,
          isVisible = !!target.parent(':visible').length;

          // only process further if Bookmared tabs is open
          // 
          if (!isVisible) {
            return;
          }

          selected = selected.length ? selected : target.find('li:first-child');

          if (selected.length) {
            if ([37,38].indexOf(e.keyCode) > -1) { // up / left
              
              selected.removeClass("active");
              if (selected.prev().length == 0) {
                  li = selected.siblings().last();
              } else {
                  li = selected.prev();
              }
            }
            if ([39, 40].indexOf(e.keyCode) > -1) { // down / right
                selected.removeClass("active");
                if (selected.next().length == 0) {
                    li = selected.siblings().first();
                } else {
                    li = selected.next();
                }
            }

            if (li.length) {
              li.trigger('click');
            }
          }

        });

    }

    // Initialise Mapping
    // 
    function initMap() {

      // Create Map
      // 
      map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9',
        center: [-99.9, 41.5],
        zoom: 3,
        maxZoom: 12
      });

      // Add zoom and rotation controls to the map.
      // 
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

      // Create Popup control
      // 
      var mapPopup = new mapboxgl.Popup({closeOnClick: false}),
      iCountyZoomThreshold = 4,
      // Lets not show the dots
      iClusterZoomThreshold = 13;

      map.on('load', function() {

        // Dispatch map load event
        dispatch.apply('mapLoaded');

      });

      // Share dispatch with Popup
      // 
      Popup.setDispatch(dispatch);

      /**
       * Load counties Geojson
       * This features from here will be used
       * to join with ZIP from profile dataset
       * to build a layer of Profiles
       *
       * TODO - we may get these features from Mapbox layer instead of loading it
       * separately
       * 
       * @return {[type]} [description]
       */
      function loadGeojson() {

        // Work with GeoJSON
        // 
        d3.json("data/GeoJSON/counties/counties-metrics-geo-3220.json").then(function(oGeoJSON){
            
            oCountiesGeoJSON = oGeoJSON;
            
        });
        
      }

      loadGeojson();

      // Load Counties TopoJSON
      // 
      // 1. Filter topologies where our profiles are situated.
      // 2. Get GeoJSON features of these topologies
      // 3. Get centroid of GeoJSON features
      // 4. Build a Map of properties.zcta to feature
      // 5. Add a Point feature for every profile
      // 6. Build a GeoJSON data source
      
      function buildProfileFeatureData(bReturnData) {

        var aProfiles = DataManager.getQuerySet(),
        aZipUnique = getUniqueZipFromProfile(aProfiles),
        aGeoID = getUniqueGEOIDFromProfile(aProfiles);

        // 1. Filter features where our profiles are situated.
        // 
        var aFeatureGeo = getFeaturesFromGeoID(oCountiesGeoJSON.features, aGeoID);
        
        //console.log("Found features", aFeatureGeo, 'aMissingZCTA' , aGeoID/*, aZipUnique*/);

        // 3. Get centroid of GeoJSON features
        // 
        var aFeatureCentroids = getGeoCentroid(aFeatureGeo);

        //console.log('Centroid Geo Features', aFeatureCentroids);

        // 4. Build a Map of properties.GEOID to feature
        // 
        var oGEOIDFeature = d3.map(aFeatureCentroids, function(f){
            return f.properties.GEOID;
        });

        // 5. Add a Point feature for every profile
        // 
        var aProfileCentroids = aProfiles.map(function(p){
            // Find the GEOID via lookup
            // 
            var oF = oGEOIDFeature.get(DataManager.getZIP2GEOID(p._zip)),
            oProfileF;

            // if feature is found,
            // add profile properties to the feature
            // 
            if (oF) {
              oProfileF = _.cloneDeep([oF])[0];
              oProfileF.properties = Object.assign(oProfileF.properties, p);
            }

            return oProfileF;
        }).filter(function(p){
            return !!p;
        });

        // 6. Build a GeoJSON data source
        // 
        var aGeoJSON = getFeatureCollectionFromFeatures(aProfileCentroids);

        //console.log('GeoJSON', aGeoJSON);

        // 5. Add the data source to map with clustering
        // 
        //setupProfileClusterLayer(aGeoJSON);

        // 6. Add the Counties layer
        // 
        //setupCountyLayer(oCountiesGeoJSON);
        //

        if (bReturnData) {
          return aGeoJSON;
        }

        // Dispatch event
        // 
        dispatch.apply('updateProfileGeoJSON', null, [aGeoJSON]);

      }

      /**
       * Set up the Map
       *
       * 1. Add necessary data sources
       * 2. Add all the needed layers
       * 
       * Should be called only once in a Lifetime
       */
      function setupMap() {

        // 5. Add the data source to map with clustering
        // 
        var aGeoJSON = aProfileFeatures = buildProfileFeatureData(true);
        
        setupProfileClusterLayer(aGeoJSON);

        // 6. Add the Counties layer
        // 
        setupCountyLayer(oCountiesGeoJSON);

        // Setup metrics which depend on Feature-Profile Join Data
        // 
        dispatch.apply('profile-features-joined', null, [aGeoJSON]);

      }

      function setupProfileClusterLayer(aGeoJSON) {
          
          // Add a new source from our GeoJSON data and set the
          // 'cluster' option to true. GL-JS will add the point_count property to your source data.
          map.addSource("profiles", {
              type: "geojson",
              data: aGeoJSON || [],
              cluster: true,
              // Max zoom to cluster points on
              clusterMaxZoom: iClusterZoomThreshold,
              // Radius of each cluster when clustering points (defaults to 50)
              clusterRadius: 50
          });

          map.addLayer({
              id: "clusters",
              type: "circle",
              source: "profiles",
              filter: ["has", "point_count"],
              paint: {
                  "circle-color": "#ef6548", //"#666",
                  "circle-radius": [
                    'interpolate',
                    ['linear'],
                    ['get', 'point_count'],
                    5, 10,
                    100, 40,
                    1000, 50
                  ]
              }
          });

          map.addLayer({
              id: "cluster-count",
              type: "symbol",
              source: "profiles",
              filter: ["has", "point_count"],
              layout: {
                  "text-field": "{point_count_abbreviated}",
                  "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                  "text-size": 12
              },
              paint: {
                "text-color": "#fff"
              }
          });
          
          map.addLayer({
              id: "unclustered-point",
              type: "circle",
              source: "profiles",
              filter: ["!", ["has", "point_count"]],
              paint: {
                  "circle-color": "#ef6548",
                  "circle-radius": 4,
                  "circle-stroke-width": 1,
                  "circle-stroke-color": "#fff"
              }
          });

          // When a Cluster Marker is clicked
          // 
          map.on('click', 'clusters', function (e) {
              var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
              var clusterId = features[0].properties.cluster_id,
              point_count = features[0].properties.point_count,
              clusterSource = map.getSource('profiles');

              var coordinates = features[0].geometry.coordinates.slice();

              // Ensure that if the map is zoomed out such that multiple
              // copies of the feature are visible, the popup appears
              // over the copy being pointed to.
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }

              clusterSource.getClusterExpansionZoom(clusterId, function (err, zoom) {
                  if (err)
                      return;

                  map.easeTo({
                      center: features[0].geometry.coordinates,
                      zoom: zoom
                  });
              });

              // Get cluster's direct children
              // 
              clusterSource.getClusterLeaves(clusterId, point_count, 0, function(err, aFeatures){

                /*
                mapPopup.setDOMContent(Popup.miniPopup(aFeatures.map(function(d){ return d.properties; })))
                  .setLngLat(coordinates)
                  .addTo(map);
                */

                showPopupOnMap(coordinates, Popup.miniPopup(aFeatures.map(function(d){ return d.properties; })));

              });

          });

          // When an unclustered point is clicked
          // 
          map.on('click', 'unclustered-point', function (e) {
            // set bbox as 5px reactangle area around clicked point
            //var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];

            var coordinates = e.features[0].geometry.coordinates.slice(), //[e.lngLat.lng, e.lngLat.lat],
            aFeatures = map.queryRenderedFeatures(e.point, { layers: ['unclustered-point'] });

            showPopupOnMap(coordinates, Popup.miniPopup(aFeatures.map(function(d){ return d.properties; })), true);

          });
          
          // Set on Profile click function
          // 
          Popup.onProfileclick(function(allProfiles){

            mapPopup.setDOMContent(

              Popup.profilePopup({
                profiles: allProfiles, 
                isActiveProfile: true
              })

            );
          });

          map.on('mouseenter', 'clusters', function () {
              map.getCanvas().style.cursor = 'pointer';
          });
          map.on('mouseleave', 'clusters', function () {
              map.getCanvas().style.cursor = '';
          });
          map.on('mouseenter', 'unclustered-point', function () {
              map.getCanvas().style.cursor = 'pointer';
          });
          map.on('mouseleave', 'unclustered-point', function () {
              map.getCanvas().style.cursor = '';
          });

          // Event Binding
          // 

          // When new data update is available, update the datasource
          // 
          dispatch.on('updateProfileGeoJSON.cluster-layer', function(aProfilesGeoJSON){

            map.getSource("profiles")
              .setData(aProfilesGeoJSON);

          });

      }

      function setupCountyLayer(aGeoJSON) {

        var oFilters = {
          'unemp': [
                  'interpolate',
                  ['linear'],
                  ['get', 'unemp'],
                  0, '#f7fbff',
                  1, '#deebf7',
                  2, '#c6dbef',
                  4, '#9ecae1',
                  8, '#6baed6',
                  16, '#4292c6', 
                  32, '#2171b5',
                  64, '#08519c'
              ],

          'den': [
                  'interpolate',
                  ['linear'],
                  ['get', 'den'],
                  1,'#f7fcf5',
                  10,'#e5f5e0',
                  50,'#c7e9c0',
                  200,'#a1d99b',
                  500,'#74c476',
                  1000,'#41ab5d',
                  2000,'#238b45',
                  4000,'#006d2c',
                  250000,'#00441b'
              ]
        };

        /*
        // 
        1, "#fff7ec", 
        10, "#fee8c8", 
        50, "#fdd49e", 
        200, "#fdbb84", 
        500, "#fc8d59", 
        1000, "#ef6548", 
        2000, "#d7301f", 
        4000, "#b30000", 
        250000, "#7f0000"
         */

        // Add a new source from our Counties GeoJSON data
        // NOTE - Source needs data at the time of creation
        // 
        map.addSource("counties", {
            type: "geojson",
            data: aGeoJSON,
            // Max zoom to cluster points on
            clusterMaxZoom: 14,
            // Radius of each cluster when clustering points (defaults to 50)
            clusterRadius: 50
        });

        // Add Layer
        // For Unemployment / Population Density Metric
        // 
        map.addLayer({
          'id': 'county-metric',
          'source': 'counties',
          'minzoom': iCountyZoomThreshold,
          'type': 'fill',
          //'filter': ['==', 'isCounty', true],
          'paint': {
              'fill-color': oFilters['den'],
              'fill-opacity': 0.75
          }
        }, 'waterway-label');

        /*

        map.addLayer({
          'id': 'county-highlighted',
          'source': 'counties',
          //'source-layer': 'state_county_population_2014_cen',
          'minzoom': iCountyZoomThreshold,
          'type': 'fill',
          //'filter': ['==', 'isCounty', true],
          'paint': {
              'fill-color': [
                  'interpolate',
                  ['linear'],
                  ['get', 'unemp'],
                  2, '#eff3ff',
                  4, '#c6dbef',
                  6, '#9ecae1',
                  8, '#6baed6',
                  10, '#4292c6',
                  12, '#2171b5',
                  14, '#084594'
              ],
              'fill-opacity': 0.75
          }
        });

        map.on('click', 'county-metric' function(e) {
          // set bbox as 5px reactangle area around clicked point
          var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
          var features = map.queryRenderedFeatures(bbox, { layers: ['county-metric'] });

          // Run through the selected features and set a filter
          // to match features with unique FIPS codes to activate
          // the `counties-highlighted` layer.
          var filter = features.reduce(function(memo, feature) {
              memo.push(feature.properties.GEOID);
              return memo;
          }, ['in', 'GEOID']);

          map.setFilter("county-highlighted", filter);
      });

        */


        // Event Binding
        // 

        // When new data update is available, update the datasource
        // 
        var iLayerFilterUpdateTimer;
        dispatch.on('adhocMetricUpdate.county-layer', function(oPayload){

          clearTimeout(iLayerFilterUpdateTimer);

          iLayerFilterUpdateTimer = setTimeout(function(){

            // Update Paint fill of layer
            // 
            map.setPaintProperty("county-metric", "fill-color", oFilters[oPayload.metric]);

            // Set Filter
            // 
            map.setFilter("county-metric", null);
            map.setFilter("county-metric", ['all', ['>=', oPayload.metric, oPayload.value.min], ['<=', oPayload.metric, oPayload.value.max]]);

            // Update Profiles based on matching features
            // 
            var aJson = buildProfileFeatureData(true);
            if (aJson && aJson.features) {

              var _aJson = aJson.features.filter(function(f){
                return f.properties[oPayload.metric] >= oPayload.value.min && f.properties[oPayload.metric] <= oPayload.value.max;
              });

              dispatch.apply('updateProfileGeoJSON', null, [getFeatureCollectionFromFeatures(_aJson)]);

              dispatch.apply('adhocUpdateDone', null, [{
                count: _aJson.length
              }]);

            }

          }, 200);


        });
        
      }

      // Show Popup on the map
      // 
      function showPopupOnMap(coordinates, domContent, bFlyMap) {
        
        mapPopup
          .setLngLat(coordinates)
          .setDOMContent(domContent)
          .addTo(map);

        if (bFlyMap) {
          // Center map on the point
          // 
          map.flyTo({center: coordinates});
        }
      }


      // Event Binding
      // 

      // Our pre-requiste dataset has loaded
      // 
      dispatch.on('dataLoaded.map', function(){
        
        setupMap();

      });

      // When new data update is available
      // 
      dispatch.on('datasetRefreshed.cluster-layer', function(aProfiles){

        buildProfileFeatureData(/*aProfiles*/);

      });

      // Show a Profile Popup on Map
      // 
      dispatch.on('showProfileOnMap.map', function(oProfile){
        //console.log('Profile', oProfile);

        // Mark as active

        showPopupOnMap(
          oProfile.geometry.coordinates.slice(), 
          Popup.profilePopup({
            profiles: [oProfile.properties], 
            isActiveProfile: true
          }),
          true
        );

      });

      // Remove Popup on Esc
      // 
      document.addEventListener('keydown', onKeyDown);

      function onKeyDown(e) {
        // If the ESC key is pressed
        if (e.keyCode === 27) {
          // remove Popup from the map
          // 
          mapPopup.remove();
        }
      }

    }

    // Initialise Data loading
    // 
    function initData(){

      DataManager = DataModel(sUrlProfile);
      
      DataManager.then(function(aQueryDataset){

        //console.log('Aux - data loaded', aQueryDataset);

      });

      // Load data
      // 
      DataManager.load();

    }

    // Bind Events
    // 
    function bindEvents() {

      var iFilterUpdateTimer;

      dispatch.on('filterUpdate', function(oPayload) {

          //console.log('dispatch filterUpdate', oPayload);

          clearTimeout(iFilterUpdateTimer);
          iFilterUpdateTimer = setTimeout(function(){
            
            dispatch.apply('applyFiltersOnData');

          }, 100);

      });

      // On Map Load
      // This event will only be triggered ONCE
      // 
      dispatch.on('mapLoaded.mapui', function(){

        // Once we are sure, we have the profile data loaded
        // 
        var iPostMapLoadInterval = setInterval(function(){

          if (DataManager.isLoaded()) {

            // Is Profile Feature Layer data ready?
            // 
            if (oCountiesGeoJSON) {
              
              clearInterval(iPostMapLoadInterval);

              dispatch.apply('dataLoaded');

            }

          }


        }, 100);

      });


      // On Bookmark Toggle
      // 
      dispatch.on('toggleBookmark.mapui', function(oPayload){

        if (oPayload) {
          DataManager.toggleBookmark(oPayload.ID);
        }

      });

      // Menu Toggle
      // 
      jQuery('#toggle_menu').click(function() {
        jQuery(this).toggleClass('active');
        jQuery('#overlay').toggleClass('open');
      });

      // Menu Action Items
      // 
      jQuery('#filterpanel_menu li').on('click', function(e){

        var action = jQuery(this).attr("data-action");

        if (action == "copyurl") {

          copyToClipboard(generateBookmarkURL(DataManager.getBookmarks()));
          alert('Bookmark URL Copied');

        }else if (action == "clearbookmarks") {
          
          DataManager.clearBookmarks();
          dispatch.apply('toggleBookmark');

        }else if (action == "resetFilters") {

          dispatch.apply('resetFilters');

        }

        // Close the menu
        jQuery('#toggle_menu').trigger('click');

      });

      // Tab Click Events
      // 
      jQuery('.md-tabs > li').on('click', function(){
          // remove active class from siblings
          // 
          var $this = jQuery(this),
          siblings = $this.siblings(),
          siblingA = siblings.find('a'),
          targetId = $this.find('a').attr('data-target')
          $target = jQuery(targetId);

          siblings.removeClass('active');

          // mark clicked tab as active
          // 
          $this.addClass('active');

          // Toggle visibility of target contents
          // 
          siblingA.each(function(){
              jQuery(jQuery(this).attr('data-target')).hide();
          });

          // Show target content
          // 
          jQuery(targetId).show();

          // For Zip Code Association Metrics, trigger events
          // 
          if ($this.hasClass('adhoc-metric')) {


            dispatch.apply('adhocMetricUpdate', null, [{
              metric: $this.attr('data-metric'),
              value: {
                min: parseInt($target.find('input[readonly][data-min]').val()),
                max: parseInt($target.find('input[readonly][data-max]').val())
              }
            }]);

          }
      });

      // Menu Button
      var menuBtn = jQuery('#menu_btn');
      menuBtn.on('click', function (){
        
        menuBtn.toggleClass('open');

        jQuery('#filter_panel').toggleClass('open');

      });


    }

    bindEvents();

    initMap();

    initData();

    initUI();


})(window);