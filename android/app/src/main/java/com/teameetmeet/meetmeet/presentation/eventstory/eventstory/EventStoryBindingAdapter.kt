package com.teameetmeet.meetmeet.presentation.eventstory.eventstory

import android.widget.TextView
import androidx.databinding.BindingAdapter
import com.google.android.material.appbar.MaterialToolbar
import com.teameetmeet.meetmeet.R
import com.teameetmeet.meetmeet.data.model.EventStory
import com.teameetmeet.meetmeet.presentation.model.EventAuthority

@BindingAdapter("event_story")
fun TextView.bindTextViewDate(eventStory: EventStory?) {
    eventStory ?: return
    text = String.format(context.getString(R.string.event_story_event_date), eventStory.startDate, eventStory.endDate)
}

@BindingAdapter("menu_more_enable")
fun MaterialToolbar.bindMenuEnable(eventAuthority: EventAuthority){
    menu.findItem(R.id.menu_see_more_event_story).isVisible = eventAuthority != EventAuthority.GUEST
}