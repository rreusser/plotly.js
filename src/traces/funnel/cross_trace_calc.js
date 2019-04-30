/**
* Copyright 2012-2019, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var setGroupPositions = require('../bar/cross_trace_calc').setGroupPositions;

module.exports = function crossTraceCalc(gd, plotinfo) {
    var fullData = gd._fullData;
    var calcdata = gd.calcdata;
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;
    var funnels = [];
    var funnelsVert = [];
    var funnelsHorz = [];
    var cd, i;

    for(i = 0; i < fullData.length; i++) {
        var fullTrace = fullData[i];
        var isHorizontal = (fullTrace.orientation === 'h');

        if(
            fullTrace.visible === true &&
            fullTrace.xaxis === xa._id &&
            fullTrace.yaxis === ya._id &&
            fullTrace.type === 'funnel'
        ) {
            cd = calcdata[i];

            if(isHorizontal) {
                funnelsHorz.push(cd);
            } else {
                funnelsVert.push(cd);
            }

            funnels.push(cd);
        }
    }

    setGroupPositions('funnel', gd, xa, ya, funnelsVert);
    setGroupPositions('funnel', gd, ya, xa, funnelsHorz);

    for(i = 0; i < funnels.length; i++) {
        cd = funnels[i];

        for(var j = 0; j < cd.length; j++) {
            if(j + 1 < cd.length) {
                cd[j].nextP0 = cd[j + 1].p0;
                cd[j].nextS0 = cd[j + 1].s0;

                cd[j].nextP1 = cd[j + 1].p1;
                cd[j].nextS1 = cd[j + 1].s1;
            }
        }
    }
};
