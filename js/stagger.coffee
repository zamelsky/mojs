# ignore coffescript sudo code
### istanbul ignore next ###
h        = require './h'
Timeline = require './tween/timeline'
Tween    = require './tween/tween'
Transit  = require './transit'

class Stagger extends Transit
  isSkipDelta: true
  ownDefaults:
    delay: 'stagger(200)'
    els:   null
    stroke: ['yellow', 'cyan', 'deeppink']

  vars:->
    h.extend(@ownDefaults, @defaults); @defaults = @ownDefaults
    super; @parseEls()

  parseEls:->
    if @props.els + '' is '[object NodeList]'
      @props.els = Array::slice.call @props.els, 0
    else if typeof @props.els is 'string'
      els = document.querySelector @props.els
      @props.els = h.getChildElements els
    else if h.isDOM(@props.els)
      @props.els = h.getChildElements @props.els

  createBit:->
    @transits = []; len = @props.els.length
    for i in [0...len]
      transit = new Transit @getOption(i)
      transit.index = i
      @transits.push(transit)

  getOption:(i)->
    option = {}
    for key, value of @props
      option[key] = @getPropByMod(key, i)
    option.bit = @getPropByMod('els', i)
    # console.log option.strokeDashoffset
    # option.delay += i*100
    option

  getPropByMod:(name, i)->
    prop = @props[name]; if h.isArray(prop) then prop[i % prop.length] else prop

  render:-> @createBit(); @setProgress(0, true); @createTween(); @
  isDelta:-> false
  createTween:->
    # optimization TODO:
    # the stagger doesnt need the self timeline
    super; i = @transits.length; @tween.add(@transits[i].timeline) while(i--)

  # setProgress:->
  # calcSize:->
  draw:->

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Stagger", [], -> Stagger
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Stagger
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.Stagger = Stagger
