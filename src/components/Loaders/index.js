import React from 'react'
import ContentLoader from 'react-content-loader'

export const CommentLoader = (props) => (
  <ContentLoader height="52" width="800" {...props}>
    {/* Pure SVG */}
    <rect x="0" y="8" rx="3" ry="3" width="100%" height="10" />
    <rect x="0" y="26" rx="3" ry="3" width="60%" height="10" />
    <rect x="0" y="42" rx="3" ry="3" width="80%" height="10" />
  </ContentLoader>
)

export const ImgLoader = (props) => (
  <ContentLoader width="280" height="150" {...props}>
    {/* Pure SVG */}
    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
  </ContentLoader>
)


export const ImgMiddleLoader = (props) => (
  <ContentLoader width="150" height="150" {...props}>
    {/* Pure SVG */}
    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
  </ContentLoader>
)

export const SmallImgLoader = (props) => (
  <ContentLoader width="80" height="80" {...props}>
    {/* Pure SVG */}
    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
  </ContentLoader>
)

export const HeaderLoader = (props) => (
  <ContentLoader height="35" {...props}>
    {/* Pure SVG */}
    <rect x="0" y="0" rx="3" ry="3" width="70%" height="25" />
  </ContentLoader>
)

export const TextLoader = (props) => (
  <ContentLoader height="90" {...props}>
    {/* Pure SVG */}
    <rect x="0" y="0" rx="3" ry="3" width="100%" height="12" />
    <rect x="0" y="20" rx="3" ry="3" width="60%" height="12" />
    <rect x="0" y="40" rx="3" ry="3" width="80%" height="12" />
    <rect x="0" y="60" rx="3" ry="3" width="90%" height="12" />
    <rect x="0" y="80" rx="3" ry="3" width="40%" height="12" />
  </ContentLoader>
)

// export const StringLoader = (props) => (
//   <ContentLoader height="20" {...props}>
//     {/* Pure SVG */}
//     <rect x="0" y="20" rx="3" ry="3" width="40%" height="12" />
//   </ContentLoader>
// )

export const InfoLoader = (props) => (
  <ContentLoader height="40" {...props}>
    {/* Pure SVG */}
    <rect x="0" y="0" rx="3" ry="3" width="60%" height="35" />
  </ContentLoader>
)

export const CardLoader = (props) => (
  <div>
    <InfoLoader {...props} />
    <ImgLoader {...props} />
    <HeaderLoader {...props} />
    <TextLoader {...props} />
  </div>

)
