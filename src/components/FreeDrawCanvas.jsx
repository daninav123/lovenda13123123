import React, { useRef, useState, useEffect } from 'react';

/**
 * FreeDrawCanvas
 * Simple freehand drawing canvas that captures pointer strokes, smooths them with Chaikin algorithm,
 * and renders the smoothed path as SVG.
 * Props:
 *   onFinalize(points) => called when user double-clicks / presses Finish to commit current stroke
 */
export default function FreeDrawCanvas({ className = '', style = {}, strokeColor = '#3b82f6', scale = 1, offset = { x: 0, y: 0 }, areas = [], onFinalize }) {
  const svgRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [drawing, setDrawing] = useState(false);

  const toSvgPoint = (e) => {
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    // adjust for current transform
    return {
      x: (e.clientX - rect.left - offset.x) / scale,
      y: (e.clientY - rect.top - offset.y) / scale,
    };
  };

  // Chaikin smoothing – one iteration
  const smooth = (pts) => {
    if (pts.length < 2) return pts;
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      out.push({ x: 0.75 * p0.x + 0.25 * p1.x, y: 0.75 * p0.y + 0.25 * p1.y });
      out.push({ x: 0.25 * p0.x + 0.75 * p1.x, y: 0.25 * p0.y + 0.75 * p1.y });
    }
    return out;
  };

  const getPathD = (pts) => {
    if (!pts.length) return '';
    const d = [`M ${pts[0].x} ${pts[0].y}`];
    for (let i = 1; i < pts.length; i++) d.push(`L ${pts[i].x} ${pts[i].y}`);
    return d.join(' ');
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    setDrawing(true);
    setPoints([toSvgPoint(e)]);
  };

  const handlePointerMove = (e) => {
    if (!drawing) return;
    setPoints((prev) => [...prev, toSvgPoint(e)]);
  };

  const handlePointerUp = () => {
    setDrawing(false);
  };

  const handleDoubleClick = () => {
    if (points.length > 2) {
      const smoothed = smooth(points);
      onFinalize && onFinalize(smoothed);
      setPoints([]);
    }
  };

  return (
    <svg
      ref={svgRef}
      className={`w-full h-full touch-none ${className}`}
      style={style}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={handleDoubleClick}
    >
      {/* rendered areas */}
      {areas.map((poly, idx) => (
        <path key={idx} d={getPathD(poly)} stroke="#10b981" strokeWidth={2} fill="none" />
      ))}
      {/* current stroke */}
      <g transform={`translate(${offset.x} ${offset.y}) scale(${scale})`}>
      {/* rendered areas */}
      {areas.map((poly, idx) => (
        <path key={idx} d={getPathD(poly)} stroke="#10b981" strokeWidth={2} fill="none" />
      ))}
      {/* current stroke */}
      <path d={getPathD(points)} stroke={strokeColor} strokeWidth={2} fill="none" />
      </g>
    </svg>
  );
}
