import SwiftUI
import Foundation
import CoreGraphics

public enum MyAutoSizingLib {

  public class ShadowNodeProxy: Equatable {
    public static func == (lhs: ShadowNodeProxy, rhs: ShadowNodeProxy) -> Bool {
      return lhs === rhs
    }

    public static let SHADOW_NODE_MOCK_PROXY = ShadowNodeProxy()
    public var setViewSize: ((CGSize) -> Void)?
    public static let UNDEFINED_SIZE: CGFloat = -1
  }

  public enum ExpoSwiftUI {
    public struct AxisSet: OptionSet {
      public let rawValue: Int

      public init(rawValue: Int) {
        self.rawValue = rawValue
      }

      public static let horizontal = AxisSet(rawValue: 1 << 0)
      public static let vertical = AxisSet(rawValue: 1 << 1)
      public static let both: AxisSet = [.horizontal, .vertical]
    }

    public struct AutoSizingStack<Content: SwiftUI.View>: SwiftUI.View {
      let content: Content
      let proxy: ShadowNodeProxy
      let axis: AxisSet

      public init(
        shadowNodeProxy: ShadowNodeProxy,
        axis: AxisSet = .both,
        @ViewBuilder _ content: () -> Content
      ) {
        self.proxy = shadowNodeProxy
        self.content = content()
        self.axis = axis
      }

      public var body: some SwiftUI.View {
        if #available(iOS 16.0, tvOS 16.0, macOS 13.0, *) {
          if proxy !== ShadowNodeProxy.SHADOW_NODE_MOCK_PROXY {
            content.overlay {
              content
                .fixedSize(
                  horizontal: axis.contains(.horizontal),
                  vertical: axis.contains(.vertical)
                )
                .hidden()
                .expo_onGeometryChange(
                  for: CGSize.self,
                  of: { proxy in proxy.size },
                  action: { size in
                    var size = size
                    size.width = axis.contains(.horizontal) ? size.width : ShadowNodeProxy.UNDEFINED_SIZE
                    size.height = axis.contains(.vertical) ? size.height : ShadowNodeProxy.UNDEFINED_SIZE
                    proxy.setViewSize?(size)
                  }
                )
            }
          } else {
            content
          }
        } else {
          content.onAppear {
            print("⚠️ AutoSizingStack is not supported on iOS/tvOS < 16.0")
          }
        }
      }
    }
  }
}

extension View {
  func expo_onGeometryChange<T: Equatable>(
    for type: T.Type,
    of keyPath: @escaping (GeometryProxy) -> T,
    action: @escaping (T) -> Void
  ) -> some View {
    self.background(
      GeometryReader { geometry in
        Color.clear
          .preference(key: ExpoGeometryPreferenceKey<T>.self, value: keyPath(geometry))
      }
    )
    .onPreferenceChange(ExpoGeometryPreferenceKey<T>.self, perform: action)
  }
}

private struct ExpoGeometryPreferenceKey<T: Equatable>: PreferenceKey {
  static var defaultValue: T { fatalError("defaultValue must be implemented for \(T.self)") }

  static func reduce(value: inout T, nextValue: () -> T) {
    value = nextValue()
  }
}
