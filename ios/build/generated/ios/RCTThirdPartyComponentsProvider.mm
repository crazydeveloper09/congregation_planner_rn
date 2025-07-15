/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


#import <Foundation/Foundation.h>

#import "RCTThirdPartyComponentsProvider.h"
#import <React/RCTComponentViewProtocol.h>

@implementation RCTThirdPartyComponentsProvider

+ (NSDictionary<NSString *, Class<RCTComponentViewProtocol>> *)thirdPartyFabricComponents
{
  static NSDictionary<NSString *, Class<RCTComponentViewProtocol>> *thirdPartyComponents = nil;
  static dispatch_once_t nativeComponentsToken;

  dispatch_once(&nativeComponentsToken, ^{
    thirdPartyComponents = @{
			@"RNGestureHandlerButton": NSClassFromString(@"RNGestureHandlerButtonComponentView"), // react-native-gesture-handler
			@"RNCSafeAreaProvider": NSClassFromString(@"RNCSafeAreaProviderComponentView"), // react-native-safe-area-context
			@"RNCSafeAreaView": NSClassFromString(@"RNCSafeAreaViewComponentView"), // react-native-safe-area-context
			@"RNSFullWindowOverlay": NSClassFromString(@"RNSFullWindowOverlay"), // react-native-screens
			@"RNSModalScreen": NSClassFromString(@"RNSModalScreen"), // react-native-screens
			@"RNSScreenContainer": NSClassFromString(@"RNSScreenContainerView"), // react-native-screens
			@"RNSScreenContentWrapper": NSClassFromString(@"RNSScreenContentWrapper"), // react-native-screens
			@"RNSScreenFooter": NSClassFromString(@"RNSScreenFooter"), // react-native-screens
			@"RNSScreen": NSClassFromString(@"RNSScreenView"), // react-native-screens
			@"RNSScreenNavigationContainer": NSClassFromString(@"RNSScreenNavigationContainerView"), // react-native-screens
			@"RNSScreenStackHeaderConfig": NSClassFromString(@"RNSScreenStackHeaderConfig"), // react-native-screens
			@"RNSScreenStackHeaderSubview": NSClassFromString(@"RNSScreenStackHeaderSubview"), // react-native-screens
			@"RNSScreenStack": NSClassFromString(@"RNSScreenStackView"), // react-native-screens
			@"RNSSearchBar": NSClassFromString(@"RNSSearchBar"), // react-native-screens
			@"RNDateTimePicker": NSClassFromString(@"RNDateTimePickerComponentView"), // @react-native-community/datetimepicker
    };
  });

  return thirdPartyComponents;
}

@end
