# Music

Here's a scale on a piano.

[PianoScale]{}

We can stretch them out and look at them on a line.

[LinearScale]{}

Or we can wrap them on a circle.

[CircleScale]{
size: 30
}

Here's what they'd look like in an octave on a guitar.

[GuitarScale]{}

Here's a generalization of the linear version, similar to a guitar, where you can change the offset between each row.

[LinearStackScale]{}

Notice that drawing a line of fourths (5 offset) makes the 7th mode of the major scale and drawing a line of 5ths (7 offset) makes the 4th mode. They both draw out the pentatonic scale. Interesting because this is these are 2/3 and 3/2 ratios. They also produce scales that are a reflection of each other.

[LinearStackScale]{size: 20, offset: 6}

[LinearStackScale]{
size: 20,
offset: 5,
style: {display: "inline-block", marginRight: "2em"}
}
[LinearStackScale]{
size: 20,
offset: 7,
style: {display: "inline-block", marginRight: "2em"}
}

[LinearStackScale]{
size: 20,
offset: 4,
style: {display: "inline-block", marginRight: "2em"}
}
[LinearStackScale]{
size: 20,
offset: 8,
style: {display: "inline-block", marginRight: "2em"}
}

Here, the offset in each row is adjustable to see how different modes of the same notes line up. The numbers on the tiles are arbitrary, and change upon selection, but useful for alignment.

[ModeStack]{}

We can also check out how many of each type of interval live in a given selection of notes.

[IntervalCounter]{}
