// Get Settings
app.get("/system-config", async (req, res) => {
  const config = await prisma.systemConfig.findFirst({ where: { id: 1 } });
  res.json(config);
});

// Update Settings
app.put("/system-config", async (req, res) => {
  const data = req.body;
  const updated = await prisma.systemConfig.update({
    where: { id: 1 },
    data: {
      ...data,
      taxRate: parseFloat(data.taxRate),
      serviceCharge: parseFloat(data.serviceCharge),
    },
  });
  res.json(updated);
});
