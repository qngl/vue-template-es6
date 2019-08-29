/* eslint-env jest */

import { load, show, getGeoCity, getBaiduCity } from '../service';
const map = {};

describe('@/components/baiduMap/service ', () => {
  const centerAndZoom = jest.fn();
  const enableScrollWheelZoom = jest.fn();
  const getCenter = jest.fn().mockImplementation(() => {
    return 'point';
  });
  const addEventListener = jest.fn().mockImplementation((event, cb) => {
    map[event] = cb;
  });
  const removeEventListener = jest.fn();
  const addOverlay = jest.fn();

  beforeAll(() => {});
  beforeEach(() => {
    jest.spyOn(window, 'setTimeout');
    window.BMap = {
      Map: () => {
        return {
          centerAndZoom: centerAndZoom,
          enableScrollWheelZoom: enableScrollWheelZoom,
          getCenter: getCenter,
          addEventListener: addEventListener,
          removeEventListener: removeEventListener,
          addOverlay: addOverlay
        };
      },
      Marker: () => {
        return {};
      }
    };
  });

  it('should load baidu map', () => {
    load();
    // mock baidu map callback
    window.baidumapinit();
    expect(window.setTimeout).toHaveBeenCalled();
  });

  it('should show baidu map', () => {
    load().then(() => {
      show('element', {
        centerAndZoom: '北京运通兴恩汽车销售服务有限公司'
      });
      // mock event trigger
      map.tilesloaded();

      expect(centerAndZoom).toHaveBeenCalledWith('北京运通兴恩汽车销售服务有限公司', 14);
      expect(enableScrollWheelZoom).toHaveBeenCalled();
      expect(addEventListener).toHaveBeenCalled();
      expect(getCenter).toHaveBeenCalled();
      expect(addOverlay).toHaveBeenCalled();
      expect(removeEventListener).toHaveBeenCalled();
    });
  });

  it('should getBaiduCity', () => {
    getBaiduCity().then(res => {
      expect(res.body).toBe('test');
    });
    // mock baidu map callback
    window.baidumapinit({
      status: 0,
      body: 'test'
    });
  });

  it('should getGeoCity', () => {
    getGeoCity({
      latitude: 116.404,
      longitude: 39.915
    }).then(res => {
      expect(res.length).toBe(3);
      expect(res[2]).toBe('Shenzhen');
    });
    // mock baidu map callback
    window.baidumapinit({
      result: {
        addressComponent: {
          city: ['Beijing', 'Shanghai', 'Shenzhen']
        }
      }
    });
  });
});
