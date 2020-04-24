import React, { useState, useRef } from "react";
import "antd/dist/antd.css";
import { Table, Tag } from "antd";
import { AntFloat } from "./Input";

export default function ScaleExperiment() {
  const [samples, setSamples] = useState([
    {
      sample_id: 1,
      sample: "Sample 1",
      rack: 1,
      rack_position: 1
    },
    {
      sample_id: 2,
      sample: "Sample 2",
      rack: 1,
      rack_position: 2
    },
    {
      sample_id: 3,
      sample: "Sample 3",
      rack: 1,
      rack_position: 3
    }
  ]);

  const refs = [];

  const columns = [
    {
      title: "Vzorek",
      dataIndex: "sample",
      key: "sample"
    },
    {
      title: "Stojan",
      dataIndex: "rack",
      key: "rack",
      align: "center"
    },
    {
      title: "Pozice",
      dataIndex: "rack_position",
      key: "rack_position",
      align: "center"
    },
    {
      title: "Parameter 1",
      dataIndex: "p-1",
      key: "p-1",
      render: (text, record, index) => {
        console.log(text, record, index);
        console.log(refs[index]);
        return (
          <AntFloat
            name="p-1"
            sample_id={record.sample_id}
            onChange={change}
            onEnter={e => enter(e, index)}
            value={record["p-1"]}
            ref={refs[index]}
          />
        );
      },
      align: "center",
      width: "30%"
    }
  ];

  const change = ({ target: { name, value, sample_id } }) => {
    const row = samples.find(r => r.id === sample_id);
    row[name] = value;
    console.log(samples);
    setSamples([...samples]);
  };

  /**
   *
   * @param {event} e
   * @param {*} index
   */
  const enter = (_e, index) => {
    console.log(refs, index);
    // setFocus(index + 1);
    if (index + 1 < refs.length) {
      refs[index + 1].current.focus();
    }
  };

  for (let i = 0; i < samples.length; i += 1) {
    refs[i] = useRef();
    // refs[i + samples.length] = createRef();
  }

  return (
    <Table
      dataSource={samples}
      columns={columns}
      pagination={false}
      size="small"
    />
  );
}
