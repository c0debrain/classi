import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import './index.css'

import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import ButtonBase from '@material-ui/core/ButtonBase'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import LinearProgress from '@material-ui/core/LinearProgress'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'

import Img from '../Img'
import {SmallImgLoader} from '../Loaders'
import CatsAutocomplete from './CatsAutocomplete'

import {adFormChange, adFormPhotoUpload, adFormPhotoRemove, adFormSubmit, checkNewCats, openTouDialog} from '../../store/actions'
import {getCatsArray, getCatsByName} from '../../store/selectors'

class AdForm extends Component {
  static propTypes = {
    formRef: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.props.checkNewCats()
  }

  componentDidMount() {
    this.catNameInput && this.catNameInput.focus()
  }

  onChange = (e) => {
    this.props.onChange(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value)
  }

  onSubmit = (e) => {
    e.preventDefault()

    const {header, text, catName, catId, agree} = this.props.draft

    if (catId === '' && catName.trim() === '') {
      this.catNameInput.focus()
      return
    }

    if (header.trim() === '') {
      this.headerInput.focus()
      return
    }

    if (text.trim() === '') {
      this.textInput.focus()
      return
    }

    if (!agree) {
      this.agreeInput.parentNode.focus()
      return
    }

    this.props.onSubmit()

    return false
  }

  render() {
    const {formRef = () => {}, onChange, onUpload, onPhotoRemove, draft = {}, cats, catsByName, catsLoading, openTouDialog} = this.props
    const {id = '', catId = '', catName = '', header = '', text = '', agree = false, uploadingImgs = 0, photos = [], loading = false} = draft
    const totalImgs = photos.length + uploadingImgs

    return (
      <section className="AdForm">
        <form ref={el => formRef(el)} onSubmit={this.onSubmit} noValidate autoComplete="off">
          <input name="id" value={id} type="hidden"/>
          <input name="catId" value={catId} type="hidden"/>
          {id
            ?
              null
            :
              <CatsAutocomplete
                inputValue={catName}
                inputDisabled={loading}
                items={getCatsArray({cats})}
                defaultSelectedItem={catsByName[catName]}
                helperText="Choose existed or enter a new category name"
                inputRef={el => this.catNameInput = el}
                catsLoading={catsLoading}
                onInputChange={(e, clearSelection, selectItem) => {
                  const val = e.target.value
                  const cat = catsByName[val.trim()]

                  onChange('catName', val)
                  onChange('catId', (cat ? cat.id : ''))

                  if (!cat) {
                    clearSelection()
                  } else {
                    selectItem(cat)
                  }
                }}
                onChange={(selectedItem) => {
                  if(!selectedItem) return

                  onChange('catName', selectedItem.name)
                  onChange('catId', selectedItem.id)
                }}
              />
          }

          <TextField
            name="header"
            label="Header"
            value={header}
            onChange={this.onChange}
            margin="normal"
            fullWidth
            inputRef={el => this.headerInput = el}
            required
            disabled={loading}
          />
<br/>
          <TextField
            name="text"
            label="Text"
            value={text}
            onChange={this.onChange}
            margin="normal"
            multiline
            fullWidth
            inputRef={el => this.textInput = el}
            required
            disabled={loading}
          />
<br/>
          <FormControl margin='normal'>
            <FormLabel>Images:</FormLabel>
          </FormControl>

          <div className="img-list">

            {photos.map((hash, index) => (
              <div className="img-item" key={`${hash}-${index}`} title={`Photo /ipfs/${hash}`}>
                <Img
                  hash={hash}
                  src={`https://ipfs.io/ipfs/${hash}`}
                  loader={<SmallImgLoader />}
                 />

                {loading ?
                  null
                :
                  <div className="img-remove">
                    <IconButton size="small" onClick={() => {
                      onPhotoRemove(index)
                    }}>
                      <ClearIcon />
                    </IconButton>
                  </div>
                }
              </div>
            ))}

            <div className="img-item upload">
              <label>
                <ButtonBase disabled={loading} focusRipple component="span" title="Upload">
                  <PhotoCamera />
                </ButtonBase>

                <input
                  type="file"
                  accept="image/*"
                  onChange={onUpload}
                  multiple
                  style={{display: 'none'}}
                  disabled={loading}
                />
              </label>

              <div className="upload-progress" style={{
                display: (photos.length === totalImgs ? 'none' : 'block')
              }}>
                {`${photos.length}/${totalImgs}`}

                <LinearProgress style={{
                  marginTop: '-2px',
                }} />
              </div>
            </div>

          </div>

          {/*<FormHelperText className="photos-helper">
            Your photos will be distributed among other users directly from your computer. To make sure they are properly cached on other computers, visit this website as often as possible. It is also not recommended to upload too large pictures (<b>max 250kB for now</b>).
          </FormHelperText>*/}
<br/>
          <FormControlLabel
            control={
              <Checkbox
                checked={agree}
                required
                name="agree"
                onChange={this.onChange}
                color="primary"
                inputRef={el => this.agreeInput = el}
                disabled={loading}
              />
            }
            label={
              <span>
                * I agree with <a href="#" onClick={openTouDialog}>Terms of Use</a>
              </span>
            }
          />

          <button type="submit" style={{display: 'none'}} />
        </form>
      </section>
    )
  }
}


export default connect((state, ownProps) => {
  return {
    cats: state.cats,
    catsLoading: state.cats.loading,
    catsByName: getCatsByName(state),
    draft: state.drafts[ownProps.draftId]
  }
}, (dispatch, ownProps) => {
  const {draftId} = ownProps

  return {
    onChange: (name, value) => dispatch(adFormChange(draftId, name, value)),
    onUpload: (e) => {
      e.preventDefault()

      dispatch(adFormPhotoUpload(draftId, e.target.files))
    },
    onPhotoRemove: (index) => dispatch(adFormPhotoRemove(draftId, index)),
    onSubmit: () => dispatch(adFormSubmit(draftId)),
    checkNewCats: () => dispatch(checkNewCats()),
    openTouDialog: () => dispatch(openTouDialog())
  }
})(AdForm)


//                   src={`http://swarm-gateways.net/bzzr:/${hash}`}
